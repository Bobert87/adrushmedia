const scheduleModel = require('../../models/core/schedule');
const campaignModel = require('../../models/demand/campaign');
const deviceModel = require('../../models/supply/device');
const polygonModel = require('../../models/core/polygon');
const zoneModel = require('../../models/core/zone');
const adModel = require('../../models/demand/ad');
const h3 = require('h3-js');

class Schedule {
    constructor() {
        this.scheduleModel = new scheduleModel();
        this.campaignModel = new campaignModel();
        this.deviceModel = new deviceModel();
        this.polygonModel = new polygonModel();
        this.zoneModel = new zoneModel();
        this.adsModel = new adModel();
    }

    async getDevice(req) {
        const deviceId = req.params.deviceId;
        const device = await this.deviceModel.getById(deviceId, 'assetDetails');
        let location = {};
        if (device.asset.type === 'LOCATION') {
            device.asset.assetDetails.forEach(assetDetail => {
                if (assetDetail.field === 'longitude')
                    location.lng = parseFloat(assetDetail.value);
                if (assetDetail.field === 'latitude')
                    location.lat = parseFloat(assetDetail.value);
            });
        }
        else
            location = { lat: parseFloat(req.params.lat), lng: parseFloat(req.params.lng) };
        device.location = location
        return device;
    }

    campaignsWithGeoFilter(campaigns) {
        return campaigns.filter(campaign => campaign.filters.some(filter => {            
            return filter.type === 'GEO' && filter.operation === 'IN'
        }))
    }

    filterZones(zones, device) {
        const filteredZone = []
        const deviceH3 = h3.latLngToCell(device.location.lat, device.location.lng, 8);
        zones.forEach(zone => {
            zone.areas.forEach(area => {
                const zoneHex = h3.polygonToCells(area.polygon.coordinates, 8);
                if (zoneHex.indexOf(deviceH3) > -1)
                    filteredZone.push(zone);

            })
        });
        return filteredZone;
    }

    formatAreas(zones) {
        const formatedZones = JSON.parse(JSON.stringify(zones));
        formatedZones.forEach(zone => {
            zone.areas.forEach(area => {
                const coordinates = area.polygon.coordinates
                const formatedPolygon = []
                for (let i = 0; i < coordinates.length; i = i + 2) {
                    const element = [coordinates[i + 1], coordinates[i]];
                    formatedPolygon.push(element);
                }
                area.polygon.coordinates = formatedPolygon;
            });
        });

        return formatedZones;
    }

    getCampaignZoneDictionary(campaigns) {
        const zones = [];
        campaigns.forEach(campaign => {
            campaign.filters.forEach(filter => {                    
                if (filter.type === 'GEO' && filter.operation === 'IN') {                        
                    zones.push({campaign, zoneId:parseInt(filter.value)});
                }
            });
            
        });
        return zones;

    }

    async needsNewSchedule(device){
        //discard creating  new schedule if the last was served less than x time ago.
        const currentTime = new Date();
        const lastSchedule = await this.scheduleModel.getScheduleByDeviceId(device.id);
        const elapsedTimeInMins = (currentTime - lastSchedule) / 60000;
        if (elapsedTimeInMins < 1) {
            return false;
        }
        return true;
    }

    floatArrayToLatLngArray(floatArray){
        const latLngArray = [];
        for (let i = 0; i < floatArray.length; i = i + 2) {
            const element = [floatArray[i + 1], floatArray[i]];
            latLngArray.push(element);
        }
        return latLngArray;
    }

    // This should be introduce with cache as it is a heavy operation
    // that will rarely change its values over time.
    async generateH3HexesByZone(zoneIds){
        const allZones = await this.zoneModel.getByIds(zoneIds, 'areas');
        const h3HexByZone = {};
        allZones.forEach(zone => {            
            zone.areas.forEach(area => {
                const latLngArray = this.floatArrayToLatLngArray(area.polygon.coordinates);
                const h3Hexes = h3.polygonToCells(latLngArray, 8);
                h3HexByZone[zone.id] = h3HexByZone[zone.id] || [];
                h3HexByZone[zone.id].push(h3Hexes);
            });
        });
        return h3HexByZone;
    }

    async deviceInZone(device, campaignZoneDictionary){
        const campaigns = {};
        const h3Areas = await this.generateH3HexesByZone(campaignZoneDictionary.map(campaignZone => campaignZone.zoneId));
        const h3Device = h3.latLngToCell(device.location.lat, device.location.lng, 8);
        for (const zoneId in h3Areas) {
            if (h3Areas[zoneId].some(h3Hex => h3Hex.indexOf(h3Device) > -1))
                campaignZoneDictionary.forEach(campaignZone => {
                    if (campaignZone.zoneId === parseInt(zoneId))
                        if (!campaigns[campaignZone.campaign.id])
                            campaigns[campaignZone.campaign.id] = campaignZone.campaign;
                })
        }
        return campaigns;
    }

    async create(req, res) {
        try {

            // get device + location (static, it comes from asset, dyanmic, it comes from the request)
            const device = await this.getDevice(req)

            // check if the device is already scheduled
            const needsNewSchedule = await this.needsNewSchedule(device);
            if (!needsNewSchedule)
                res.status(400).json({ error: "Device is already scheduled" });

            // Will only work with active campaings.
            const activeCampaigns = await this.campaignModel.getByStatus('ACTIVE', 'filters,ads');

            // This constructs a dictionary with the campaign and the zone that has a geo filter
            const campaignZoneDictionary = this.getCampaignZoneDictionary(activeCampaigns)            

            const geoFilteredCampaigns = await this.deviceInZone(device,campaignZoneDictionary);
            
            const ads = [];
            for (const campaignId in geoFilteredCampaigns) {
                const campaign = geoFilteredCampaigns[campaignId];
                campaign.ads.forEach(ad => {
                    if (ad.status !== 'ACTIVE')
                        return;                    
                    const maxBid = campaign.maxBid;
                    const newAd = {...ad, revenue: maxBid * ad.duration/60};
                    if (newAd.targetDeviceType === device.type)
                        ads.push(newAd);
                });
            }            

            ads.sort((a, b) => b.revenue - a.revenue);

        

            // activeCampaigns.filter(campaign => {
            //     filters.forEach(zone => {
            //         if (campaign.id === zone.campaignId) {
            //             // create a schedule for the device
            //             this.scheduleModel.create(device.id, campaign.id, zone.id);
            //         }
            //     });
            
            // })

            if (ads)
                res.json({ ads})

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /******************
     * Inputs needed:
     * Device Location
        * transform Location H3 / R 7
     * Active Campaigns,
       * Targeted Zones H3 / R 7
     * Intersection between campaigns and device location,
     *  if there is an intersection, then increase resolution to R8
     *  if there is an intersection, then increase resolution to R9
     *  if there is an intersection, then increase resolution to R10
     *  if there is an intersection, then increase resolution to R11
     * Ads
     *  maybe use memoization for target resolutions
     * ****************/
}

module.exports = Schedule;