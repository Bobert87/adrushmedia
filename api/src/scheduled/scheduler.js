const cron = require("node-cron");
const generateInvoices = require("./generateInvoice");
const AdvertiserStatusUpdater = require("./advertiserStatusUpdater");
const CampaignStatusUpdater = require("./campaignStatusUpdater");

class scheduledTasksManager {
	constructor() {
		this.advertiserStatusUpdater = new AdvertiserStatusUpdater();
		this.campaignStatusUpdater = new CampaignStatusUpdater();
		this.tasks = [];
		//At 7am on the first day of every month
		this.tasks.push(
			cron.schedule("0 7 1 * *", () => {
				generateInvoices();
			}),
		);

		//At midnight every day
		this.tasks.push(
			cron.schedule("0 0 * * *", () => {
				//
			}),
		);

		//At minute 0 every hour
		this.tasks.push(
			cron.schedule("0 * * * *", () => {
				this.advertiserStatusUpdater.updateAdvertisersStatus();
			}),
		);

		//Every 15 every hour
		this.tasks.push(
			cron.schedule("*/15 * * * *", () => {
				this.campaignStatusUpdater.updateCampaignStatus();
			}),
		);
	}
}

module.exports = new scheduledTasksManager().tasks;
