const { CampaignStatus } = require("@prisma/client");
const adImpressionModel = require("../../models/core/adImpression");
const campaignModel = require("../../models/demand/campaign");

class AdImpression {
	constructor() {
		this.adImpression = new adImpressionModel();
		this.campaignModel = new campaignModel();
	}
	async create(req, res) {
		try {
			const adImpression = req.body;
			const campaign = await this.campaignModel.getById(
				adImpression.campaignId,
				"campaign",
			);
			adImpression.amount = campaign.maxBid;
			const createdAdImpression = await this.adImpression.create(adImpression);
			const currentmonth = new Date().getMonth();
			const from = new Date(new Date().getFullYear(), currentmonth, 1);
			const to = new Date(new Date().getFullYear(), currentmonth + 1, 1);
			const spendLog = await this.adImpression.getByCampaignIdAndDateRange(
				campaign.id,
				from,
				to,
			);
			const monthSpend = spendLog.reduce((acc, log) => acc + log.amount, 0);
			const daySpend = spendLog.reduce((acc, log) => {
				if (log.createdAt.getDay() === new Date().getDay()) acc + log.amount}, 0);
			if (monthSpend > campaign.monthlyBudget) {
				campaign.lastStatus = campaign.status;
				campaign.status = CampaignStatus.MAXED_OUT_MONTH;
			}

			if (daySpend > campaign.dailyBudget) {
				campaign.lastStatus = campaign.status;
				campaign.status = CampaignStatus.MAXED_OUT_DAY;
			}

			this.campaignModel.update(campaign.id, campaign);

			res.json(createdAdImpression);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = AdImpression;