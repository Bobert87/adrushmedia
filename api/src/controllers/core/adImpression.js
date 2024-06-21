const AdImpressionModel = require("../../models/core/adImpression");
const AdModel = require("../../models/demand/ad");

class AdImpression {
	constructor() {
		this.adImpression = new AdImpressionModel();
		this.adModel = new AdModel();
	}

	randomDateForYearMonth(){
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const randomDay = Math.floor(Math.random() * 30) + 1;
		return new Date(currentYear, currentMonth, randomDay);
	}
	async create(req, res) {
		try {			
			const adId = Number.parseInt(req.params.adId);
			const ad = await this.adModel.getById(adId,"campaign");									;						
			const adImpression = {
				adId,
				campaignId : ad.campaignId,
				advertiserId: ad.campaign.advertiserId,
				deviceId: Number.parseInt(req.params.deviceId),
				latitude: Number.parseFloat(req.params.lat),
				longitude: Number.parseFloat(req.params.lng),
				scheduleId: Number.parseInt(req.params.scheduleId),
				amount: ad.campaign.maxBid*ad.duration,///60,
				createdAt: this.randomDateForYearMonth(),//THIS MUST BE REMOVED IN PRODUCTION
			}
			const createdAdImpression = await this.adImpression.create(adImpression);
			res.json(createdAdImpression);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = AdImpression;