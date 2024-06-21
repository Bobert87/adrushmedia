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
		const adImpressionsByCampaign = groupByKey(adImpressions, "campaignId");		
		const campaignsThatExceedMonthlyBudget = []
		const campaignsThatExceedDailyBudget = []
		for (const campaignId in adImpressionsByCampaign){
			const campaign = adImpressionsByCampaign[campaignId];
			for (const dayImpressions of campaign){
				const now = new Date().getDate();
				const isToday = dayImpressions.date.getDate() === now;
				const isMaxedOut = dayImpressions.sumAmount > dayImpressions.dailyBudget;
				if (isToday && isMaxedOut) {
					const dailyMaxedOutCampaign = {
						campaignId: dayImpressions.campaignId,
						date: dayImpressions.date,
						sumAmount: dayImpressions.sumAmount,
						dailyBudget: dayImpressions.dailyBudget,
						status: CampaignStatus.MAXED_OUT_DAY,					
					}
					campaignsThatExceedDailyBudget.push(dailyMaxedOutCampaign);
				}
			}			
			const amount = campaign.reduce((acc, dayImpressions) => acc + Number.parseFloat(dayImpressions.sumAmount), 0);
			if (amount >campaign[0].monthlyBudget){				
				const monthlyMaxedOutCampaign = {
					campaignId: campaign[0].campaignId,
					month: campaign[0].date.getMonth()+1,
					sumAmount: amount,
					monthlyBudget: campaign[0].monthlyBudget,
					status: CampaignStatus.MAXED_OUT_MONTH,					
				}
				campaignsThatExceedMonthlyBudget.push(monthlyMaxedOutCampaign);
			}
		}

		logger.info(adImpressionsByCampaign);
		// The adImpressionsToday is an array of objects with the sumAmount > dailyBudget
		// This list needs to be updated to maxed out for the day.
		logger.info(campaignsThatExceedDailyBudget)
		logger.info(campaignsThatExceedMonthlyBudget)
		logger.info(adImpressions);

		logger.info(`Updating Campaign Status to MAXED_OUT_DAY campaignIds:[${campaignsThatExceedDailyBudget.map((campaign) => {return campaign.campaignId}).join(',')}] found. `);
		logger.info(`Updating Campaign Status to MAXED_OUT_MONTH campaignIds [${campaignsThatExceedMonthlyBudget.map((campaign) => {return campaign.campaignId}).join(',')}] found. `);
		//TODO: Implement the logic to update the campaign status based on the ad impressions
		// FIRST I NEED TO CREATE IMPRESSIONS FOR CAMPAIGNS
	}
}

module.exports = CampaignStatusUpdater;
