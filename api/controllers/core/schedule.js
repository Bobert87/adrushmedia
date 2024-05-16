const scheduleModel = require('../../models/core/schedule');
const campaignModel = require('../../models/demand/campaign');
const h3 = require('h3-js');

class Schedule {
    constructor() {
        this.scheduleModel = new scheduleModel();
        this.campaignModel = new campaignModel();
    }


    async create(req, res) {
        try {
            const deviceId = req.params.deviceId;

            //discard creating a new schedule if the last was served less than x time ago.
            const currentTime = new Date();
            const lastSchedule = await this.scheduleModel.getScheduleByDeviceId(deviceId);
            const elapsedTimeInMins = (currentTime - lastSchedule) / 60000;
            if (elapsedTimeInMins < 1) {
                res.status(400).json({ error: "Device is already scheduled" });
            }

            // Will only work with active campaings.
            const activeCampaigns = await this.campaignModel.getByStatus('active', 'polygons');

            const polygonsToCheck = []
            const memoization = {};
            activeCampaigns.forEach(campaign => {
                campaign.targets.forEach(target => {
                    target.zone.areas.forEach(area => {
                        if (polygonsToCheck[area.polygon.name]) return;
                        const polygon = [];
                        for (let i = 0; i < area.polygon.coordinates.length / 2; i++) {
                            const coord = [parseFloat(area.polygon.coordinates[i * 2 + 1]) , parseFloat(area.polygon.coordinates[i * 2])];
                            polygon.push(coord);
                        }
                        
                        if (memoization[target.zone.name+"-"+area.polygon.name]) return;
                        polygonsToCheck.push({                            
                            target: target.zone.name,
                            polygonName: area.polygon.name,
                            polygon: polygon
                        })
                        memoization[target.zone.name+"-"+area.polygon.name] = true;
                    })
                });
            });

            console.log(polygonsToCheck);
            const onePoly = polygonsToCheck[0].polygon;
            const onePoing = [14.5902676, -90.5201267];
            console.log(onePoly);
            const h3Cells = h3.polygonToCells(onePoly,8)            
            const h3OnePointCell = h3.latLngToCell(onePoing[0],onePoing[1],8);
            console.log(h3Cells);
            console.log("H3 One Point Cell");
            console.log(h3OnePointCell);            
            
            const deviceLocation = req.params.location;
            res.json(h3Cells)

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