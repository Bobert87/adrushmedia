const { logger } = require("../utils/loggers");
const CampaignModel = require("./../models/demand/campaign");
const { CampaignStatus } = require("@prisma/client");
const AdImpressionModel = require("./../models/core/adImpression");

class CampaignStatusUpdater {
	constructor() {
		this.campaignModel = new CampaignModel();
		this.adImpression = new AdImpressionModel();
	}

	async updateCampaignStatus() {
		const campaigns = await this.campaignModel.getByStatus(
			CampaignStatus.ACTIVE,
		);
		//review these two lines
		const from = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
		const to = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
		const adImpressions =
			this.adImpression.getByCampaignIdsAndDateRangeGroupByDate(
				campaigns.map((campaign) => campaign.id),
				from,
				to,
			);
		logger.debug(adImpressions);
		logger.info(`Updating Campaign Status for ${campaigns.length} campaigns`);
		//TODO: Implement the logic to update the campaign status based on the ad impressions
		// FIRST I NEED TO CREATE IMPRESSIONS FOR CAMPAIGNS
	}
}

module.exports = CampaignStatusUpdater;
