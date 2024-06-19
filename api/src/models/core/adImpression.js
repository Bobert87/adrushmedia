const db = require("../db").client;

class AdImpression {
	async getAll() {
		return db.adImpression.findMany();
	}

	async getById(id) {
		return db.adImpression.findUnique({
			where: { id: Number.parseInt(id) },
		});
	}

	async getByAdId(adId) {
		return db.adImpression.findMany({
			where: { adId: Number.parseInt(adId) },
		});
	}

	async getByScheduleId(scheduleId) {
		return db.adImpression.findMany({
			where: { scheduleId: Number.parseInt(scheduleId) },
		});
	}

	async getByDeviceId(deviceId) {
		return db.adImpression.findMany({
			where: { deviceId: Number.parseInt(deviceId) },
		});
	}

	async getByCampaignIdAndDateRange(campaignId, from, to) {
		return db.adImpression.findMany({
			where: {
				createdAt: {
					between: [from, to],
				},
				campaignId: Number.parseInt(campaignId),
			},
		});
	}

	async getByCampaignIdsAndDateRangeGroupByDate(campaignIds, from, to) {
		return db.adImpression.groupBy({
			by: ["createdAt", "advertiserId", "campaignId"],
			where: {
				createdAt: {
					between: [from, to],
				},
				campaignId: {
					in: campaignIds,
				},
			},
		});
	}

	async getByAdvertiserIdAndDateRange(advertiserId, from, to) {
		return db.adImpression.findMany({
			where: {
				createdAt: {
					between: [from, to],
				},
				advertiserId: Number.parseInt(advertiserId),
			},
		});
	}

	async getByDateRange(from, to) {
		return db.adImpression.findMany({
			where: {
				createdAt: {
					between: [from, to],
				},
			},
		});
	}

	async create(adImpression) {
		return db.adImpression.create({
			data: {
				...adImpression,
			},
		});
	}
}

module.exports = AdImpression;
