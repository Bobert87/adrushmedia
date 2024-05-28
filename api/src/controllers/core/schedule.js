const scheduleModel = require('../../models/core/schedule');
const campaignModel = require('../../models/demand/campaign');
const deviceModel = require('../../models/supply/device');
const polygonModel = require('../../models/core/polygon');
const zoneModel = require('../../models/core/zone');
const h3 = require('h3-js');

class Schedule {
    constructor() {
        this.scheduleModel = new scheduleModel();
        this.campaignModel = new campaignModel();
        this.deviceModel = new deviceModel();
        this.polygonModel = new polygonModel();
        this.zoneModel = new zoneModel();
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

    buildZones(campaigns) {
        const zones = []
        campaigns.forEach(campaign => {
            campaign.filters.forEach(filter => {
                if (filter.type === 'GEO') {
                    zones.push({ campaignId: campaign.id, zoneId: filter.value, operation: filter.operation })
                }
            });
        });
        return zones;
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

    async create(req, res) {
        try {

            // get device + location (static, it comes from asset, dyanmic, it comes from the request)
            const device = await this.getDevice(req)

            // check if the device is already scheduled
            const needsNewSchedule = await this.needsNewSchedule(device);
            if (!needsNewSchedule)
                res.status(400).json({ error: "Device is already scheduled" });

            // Will only work with active campaings.
            const activeCampaigns = await this.campaignModel.getByStatus('ACTIVE', 'filters');

            // list all zones that appear on campaigns as filters
            const zonesOnCampaignFilters = this.buildZones(activeCampaigns);

            // a function from the model that gets all zones by id in single query.
            const allZones = await this.zoneModel.getByIds(zonesOnCampaignFilters.map(g => parseInt(g.zoneId)), 'areas');

            // same zones as below polygons are formated in [[x,y],[x,y]] format
            const formatedZones = this.formatAreas(allZones);

            // filter only the zones that are IN the device location
            const zones = this.filterZones(formatedZones, device);

            if (zones.length > 0)
                res.json({ message: 'Campaigns were found' })

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