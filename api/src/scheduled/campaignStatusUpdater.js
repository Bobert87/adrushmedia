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
		const groupByKey = (objArr, ObjKey) => {
			return objArr.reduce((arr, item) => {
				const key = item[ObjKey];
				arr[key] = arr[key] ?? [];
				arr[key].push(item);
				return arr;
			}, {});
		}

		// const spendLog = await this.adImpression.getByCampaignIdAndDateRange(
		// 	campaign.id,
		// 	from,
		// 	to,
		// );
		// const monthSpend = spendLog.reduce((acc, log) => acc + log.amount, 0);
		// const daySpend = spendLog.reduce((acc, log) => {
		// 	if (log.createdAt.getDay() === new Date().getDay()) acc + log.amount}, 0);
		// if (monthSpend > campaign.monthlyBudget) {
		// 	campaign.lastStatus = campaign.status;
		// 	campaign.status = CampaignStatus.MAXED_OUT_MONTH;
		// }

		// if (daySpend > campaign.dailyBudget) {
		// 	campaign.lastStatus = campaign.status;
		// 	campaign.status = CampaignStatus.MAXED_OUT_DAY;
		// }

		//this.campaignModel.update(campaign.id, campaign);



		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const from = new Date(currentYear, currentMonth, 1);
		const to = new Date(currentYear, currentMonth + 1, 1);
		const adImpressions =
			await this.adImpression.getAmountSumByCamapignIdsAndDateRanges(
				campaigns.map((campaign) => campaign.id),
				from,
				to,
			);
		const adImpressionsToday = adImpressions.filter((adImpression) => {
			const now = new Date().getDate() - 1;
			const isToday = adImpression.date.getDate() === now;
			const isMaxedOut = adImpression.sumAmount > adImpression.dailyBudget;
			return isToday && isMaxedOut;
		});

		const adImpressionsByCampaign = groupByKey(adImpressions, "campaignId");
		logger.info(adImpressionsByCampaign);
		// The adImpressionsToday is an array of objects with the sumAmount > dailyBudget
		// This list needs to be updated to maxed out for the day.
		logger.info(adImpressionsToday)
		logger.info(adImpressions);

		logger.info(`Updating Campaign Status for ${campaigns.length} campaigns`);
		//TODO: Implement the logic to update the campaign status based on the ad impressions
		// FIRST I NEED TO CREATE IMPRESSIONS FOR CAMPAIGNS
	}
}

module.exports = CampaignStatusUpdater;
