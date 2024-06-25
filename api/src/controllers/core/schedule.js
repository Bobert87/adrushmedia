const scheduleModel = require("../../models/core/schedule");
const campaignModel = require("../../models/demand/campaign");
const deviceModel = require("../../models/supply/device");
const polygonModel = require("../../models/core/polygon");
const zoneModel = require("../../models/core/zone");
const adModel = require("../../models/demand/ad");
const { floatArrayToLatLngArray } = require("../../utils/floatArrayToLatLngArray");

const getHitMap = require("../../utils/h3Cache");
const h3 = require("h3-js");
const { AdStatus } = require("@prisma/client");
const { logger } = require("../../utils/loggers");

const MAXSCHEDULETIME = 6000;
const MINTIMEFORNEWSCHEDULE = 500;

class Schedule {
	constructor() {
		this.scheduleModel = new scheduleModel();
		this.campaignModel = new campaignModel();
		this.deviceModel = new deviceModel();
		this.polygonModel = new polygonModel();
		this.zoneModel = new zoneModel();
		this.adsModel = new adModel();
	}

	/**
	 * Retrieves a device by its ID and returns the device object with location information.
	 * If the device is of type "LOCATION", the latitude and longitude are extracted from the asset details.
	 * Otherwise, the latitude and longitude are obtained from the request parameters.
	 * @param {Object} req - The request object.
	 * @returns {Promise<Object>} The device object with location information.
	 */
	async getDevice(req) {
		const deviceId = req.params.deviceId;
		const device = await this.deviceModel.getById(deviceId, "assetDetails");
		let location = {};
		if (device.asset.type === "LOCATION") {
			for (const assetDetail of device.asset.assetDetails) {
				if (assetDetail.field === "longitude")
					location.lng = Number.parseFloat(assetDetail.value);
				if (assetDetail.field === "latitude")
					location.lat = Number.parseFloat(assetDetail.value);
			};
		} else
			location = {
				lat: Number.parseFloat(req.params.lat),
				lng: Number.parseFloat(req.params.lng),
			};
		device.location = location;
		return device;
	}
	/**
	 * Checks if a new schedule is needed for the given device. A new schedule is needed if the last 
	 * schedule was served more than MINTIMEFORNEWSCHEDULE seconds ago.
	 *
	 * @param {object} device - The device object.
	 * @returns {boolean} - Returns true if a new schedule is needed, false otherwise.
	 */
	async needsNewSchedule(device) {
		//discard creating  new schedule if the last was served less than x time ago.
		const currentTime = new Date();
		const lastSchedule = await this.scheduleModel.getScheduleByDeviceId(
			device.id,
		);
		//If no last schedule was found, then we can create a new one
		if (lastSchedule === null) return true;

		const lastScheduleTime = new Date(lastSchedule.createdAt);		
		const elapsedTimeInMiliseconds = currentTime - lastScheduleTime;
		if (elapsedTimeInMiliseconds < MINTIMEFORNEWSCHEDULE) {			
			logger.info(`Last scheduled ${elapsedTimeInMiliseconds} ms ago, minimum time for rescheduling is ${MINTIMEFORNEWSCHEDULE} ms.`);
			return false;
		}
		return true;
	}

	// This should be introduce with cache as it is a heavy operation
	// that will rarely change its values over time.
	async generateH3HexesByZone(zoneIds) {
		const allZones = await this.zoneModel.getByIds(zoneIds, "areas");
		const h3HexByZone = {};
		for (const zone of allZones) {
			for (const area of zone.areas) {
				const latLngArray = floatArrayToLatLngArray(
					area.polygon.coordinates,
				);
				const h3Hexes = h3.polygonToCells(latLngArray, 8);
				h3HexByZone[zone.id] = h3HexByZone[zone.id] || [];
				h3HexByZone[zone.id].push(h3Hexes);
			};
		};
		return h3HexByZone;
	}

	/**
	 * Determines the campaigns associated with a device based on its location and campaign zone dictionary.
	 *
	 * @param {Object} device - The device object containing location information.
	 * @param {Array} campaignZoneDictionary - The array of campaign zones.
	 * @returns {Object} - The campaigns associated with the device.
	 */
	async deviceInZone(device, campaignZoneDictionary) {
		const campaigns = {};
		const h3Areas = await this.generateH3HexesByZone(
			campaignZoneDictionary.map((campaignZone) => campaignZone.zoneId),
		);
		const h3Device = h3.latLngToCell(
			device.location.lat,
			device.location.lng,
			8,
		);
		for (const zoneId in h3Areas) {
			if (h3Areas[zoneId].some((h3Hex) => h3Hex.indexOf(h3Device) > -1))
				for (const campaignZone of campaignZoneDictionary) {				
					if (campaignZone.zoneId === Number.parseInt(zoneId))
						if (!campaigns[campaignZone.campaign.id])
							campaigns[campaignZone.campaign.id] = campaignZone.campaign;
				};
		}
		return campaigns;
	}

	/**
	 * Retrieves the campaign zone dictionary from the given campaigns.
	 * @param {Array} campaigns - The array of campaigns.
	 * @returns {Array} - The campaign zone dictionary.
	 */
	getCampaignZoneDictionary(campaigns) {
		const zones = [];
		for (const campaign of campaigns){		
			for (const filter of campaign.filters){			
				if (filter.type === "GEO" && filter.operation === "IN") {
					zones.push({ campaign, zoneId: Number.parseInt(filter.value) });
				}
			};
		};
		return zones;
	}

	

	/**
	 * Fits the ads within the given time frame based on the provided campaigns and device.
	 *
	 * @param {Object} campaigns - The campaigns object containing campaign information.
	 * @param {Object} device - The device object containing device information.
	 * @returns {Array} - An array of ads that fit within the time frame.
	 */
	fitAdsInTimeFrame(campaigns, device) {
		const ads = [];
		for (const campaignId in campaigns) {
			const currentCampaign = campaigns[campaignId];
			for (const ad of currentCampaign.ads){			
				if (ad.status !== AdStatus.ACTIVE) continue;
				const maxBid = currentCampaign.maxBid;
				const newAd = { ...ad, revenue: (maxBid * ad.duration) / 60000 };
				//removing device type targeting for now
				//if (newAd.targetDeviceType === device.type) 
				logger.info(device.type)
				ads.push(newAd);
			};
		}

		ads.sort((a, b) => b.revenue - a.revenue);

		let totalDuration = ads.reduce((acc, ad) => acc + ad.duration, 0);
		while (totalDuration > MAXSCHEDULETIME) {
			totalDuration -= ads.pop().duration;
		}
		return ads;
	}

	/**
	 * Creates a schedule for a device based on certain criteria.
	 * 
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object.
	 * @returns {Promise<void>} - A promise that resolves when the schedule is created.
	 * @throws {Error} - If there is an error during the creation of the schedule.
	 */
	async create(req, res) {
		try {
			// Get device + location (static, it comes from asset, dyanmic, it comes from the request)
			const device = await this.getDevice(req);

			// Get h3 map from all zones using cache
			const h3Map = await getHitMap(device.location);

			// Check if the device is already scheduled
			const needsNewSchedule = await this.needsNewSchedule(device);
			if (!needsNewSchedule) {
				res.status(425).json({ message: "Device is already scheduled" });
				return;
			}

			// Get active campaigns with geo filters
			const activeCampaigns = await this.campaignModel.getByGeoFilterZones(
				Object.keys(h3Map),
			);

			// This constructs a dictionary with the campaign and the zone that has a geo filter
			const campaignZoneDictionary =
				this.getCampaignZoneDictionary(activeCampaigns);

			// Returns the campaigns that have a zone that the device is in
			const geoFilteredCampaigns = await this.deviceInZone(
				device,
				campaignZoneDictionary,
			);

			// Get the ads that fit in the time frame
			const ads = this.fitAdsInTimeFrame(geoFilteredCampaigns, device);
			if (ads.length === 0) {
				res.status(404).json({ message: "No ads to show" });
				return;
			}			

			// Create a schedule for the device
			const createdSchedule = await this.scheduleModel.create(
				device,
				ads.map((ad) => ad.id),
			);

			res.json(createdSchedule);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Schedule;
