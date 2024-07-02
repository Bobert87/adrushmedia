const { logger } = require("../utils/loggers");
const CampaignModel = require("./../models/demand/campaign");
const { CampaignStatus } = require("@prisma/client");
const AdImpressionModel = require("./../models/core/adImpression");
const { groupByKey } = require("../utils/groupByKey");

/**
 * Represents a CampaignStatusUpdater object.
 */
class CampaignStatusUpdater {
	/**
	 * Represents a CampaignStatusUpdater object.
	 * @constructor
	 */
	constructor() {
		this.campaignModel = new CampaignModel();
		this.adImpression = new AdImpressionModel();
	}

	
	/**
	 * Updates the status of campaigns, based on the daily and monthly maximum budgets.
	 * @returns {Promise} A promise that resolves when the campaign status has been updated.
	 */
	async updateCampaignStatus() {
		const campaigns = await this.campaignModel.getByStatus(
			CampaignStatus.ACTIVE,
		);
		
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
				const isMaxedOutForDay = dayImpressions.sumAmount > dayImpressions.dailyBudget;
				const isActive = dayImpressions.status === CampaignStatus.ACTIVE;
				if (isToday && isMaxedOutForDay && isActive) {
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
			const isMaxedOutForMonth = amount > campaign[0].monthlyBudget;
			const isActive = campaign[0].status === CampaignStatus.ACTIVE;
			if (isMaxedOutForMonth && isActive){				
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
		
		logger.info("Filtering campaigns which exceed monthly budget from the list of campaigns that exceed daily budget. As monthly budget has more presedence.");
		const filteredCampaignsThatExceedDailyBudget = campaignsThatExceedDailyBudget.filter((campaign) => {
			campaignsThatExceedMonthlyBudget.find((monthlyCampaign) => {
				return monthlyCampaign.campaignId === campaign.campaignId;
			})
		});
		

		logger.info(adImpressionsByCampaign);
		// The adImpressionsToday is an array of objects with the sumAmount > dailyBudget
		// This list needs to be updated to maxed out for the day.
		logger.info(campaignsThatExceedDailyBudget)
		logger.info(campaignsThatExceedMonthlyBudget)
		logger.info(filteredCampaignsThatExceedDailyBudget)
		logger.info(adImpressions);

		const updatedCampaigns = [];
		logger.info(`Updating Campaign Status to MAXED_OUT_DAY campaignIds:[${campaignsThatExceedDailyBudget.map((campaign) => {return campaign.campaignId}).join(',')}] found. `);
		const updatedCampaignsThatExceedDailyBudget = this.campaignModel.updateStatusByIds(campaignsThatExceedDailyBudget.map((campaign) => {return campaign.campaignId}), CampaignStatus.MAXED_OUT_DAY);
		logger.info(`Updating Campaign Status to MAXED_OUT_MONTH campaignIds [${campaignsThatExceedMonthlyBudget.map((campaign) => {return campaign.campaignId}).join(',')}] found. `);
		const updatedCampaignsThatExceedMonthlyBudget = this.campaignModel.updateStatusByIds(campaignsThatExceedMonthlyBudget.map((campaign) => {return campaign.campaignId}), CampaignStatus.MAXED_OUT_MONTH);
		
		updatedCampaigns.push(updatedCampaignsThatExceedDailyBudget);
		updatedCampaigns.push(updatedCampaignsThatExceedMonthlyBudget);
		return updatedCampaigns;
	}
}

module.exports = CampaignStatusUpdater;
