const { logger } = require("../utils/loggers");
const advertiser = require("../models/demand/advertiser");
const {
	AccountStatus,
	CampaignStatus,
	InvoiceStatus,
} = require("@prisma/client");

class AdvertiserStatusUpdater {
	constructor() {
		this.advertiserModel = new advertiser();
	}
	async pauseAdvertisersWithOverdueInvoice() {
		const advertisers = await this.advertiserModel.getByInvoiceStatus(
			InvoiceStatus.OVERDUE,
			"campaigns",
			"invoices",
		);
		for (const advertiser of advertisers) {		
			const overdueInvoices = advertiser.invoices.some(
				(invoice) => invoice.status === InvoiceStatus.OVERDUE,
			);
			const isOverdue = overdueInvoices.length > 0;
			if (isOverdue) {
				logger.info(
					`Advertiser Status Change from ${advertiser.status} to ${AccountStatus.OVERDUE}`,
				);
				advertiser.lastStatus = advertiser.status;
				advertiser.status = AccountStatus.OVERDUE;
				for (const campaign of advertiser.campaigns) {
					if (campaign.status === CampaignStatus.ACTIVE) {
						logger.info(
							`Camapaign Status Change from ${campaign.status} to ${CampaignStatus.ADVERTISER_PAUSED}`,
						);
						campaign.lastStatus = campaign.status;
						campaign.status = CampaignStatus.ADVERTISER_PAUSED;
					}
				};
			}
		};

		const updatedAdvertisers =
			await this.advertiserModel.updateMany(advertisers);
		return updatedAdvertisers;
	}

	async activateAdversitersWithPaidInvoices() {
		const advertisers = await this.advertiserModel.getByStatus(
			CampaignStatus.OVERDUE,
			"campaigns",
			"invoices",
		);
		for (const advertiser of advertisers) {
			const overdueInvoices = advertiser.invoices.some(
				(invoice) => invoice.status === InvoiceStatus.OVERDUE,
			);
			const isPaid = overdueInvoices.length === 0;
			if (isPaid) {
				logger.info(
					`Advertiser Status Change from ${AccountStatus.OVERDUE} to ${advertiser.lastStatus}`,
				);
				advertiser.status = advertiser.lastStatus;
				advertiser.lastStatus = AccountStatus.OVERDUE;
				for (const campaign of advertiser.campaigns) {					
					if (campaign.status === CampaignStatus.ADVERTISER_PAUSED) {
						logger.info(
							`Camapaign Status Change from ${CampaignStatus.ADVERTISER_PAUSED} to ${campaign.lastStatus}`,
						);
						campaign.status = campaign.lastStatus;
						campaign.lastStatus = CampaignStatus.ADVERTISER_PAUSED;
					}
				};
			}
		};
	}

	async updateAdvertisersStatus() {
		const pausedToActive = await this.activateAdversitersWithPaidInvoices();
		const activeToPaused = await this.pauseAdvertisersWithOverdueInvoice();
		return { pausedToActive, activeToPaused };
	}
}

module.exports = AdvertiserStatusUpdater;
