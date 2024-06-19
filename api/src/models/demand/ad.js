const db = require("../db").client;

class Ad {
	getIncludes(includes) {
		const include = {};
		if (!includes) return includes;
		const parsedincludes = includes.split(",");
		if (parsedincludes.indexOf("campaign") > -1) include.campaign = true;
		return { include: include };
	}
	async getAll() {
		return db.ad.findMany();
	}

	async getById(id, include) {
		return db.ad.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByCampaignId(campaignId) {
		return db.ad.findMany({
			where: { campaignId: Number.parseInt(campaignId) },
		});
	}

	async getByStatus(status) {
		return db.ad.findMany({
			where: { status },
		});
	}

	async getByAdvertiserId(advertiserId) {
		return db.ad.findMany({
			where: {
				campaign: { advertiser: { is: { id: Number.parseInt(advertiserId) } } },
			},
		});
	}

	async create(ad) {
		return db.ad.create({
			data: {
				...ad,
			},
		});
	}

	async update(id, ad) {
		return db.ad.update({
			where: { id: Number.parseInt(id) },
			data: {
				...ad,
			},
		});
	}

	async delete(id) {
		return db.ad.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Ad;
