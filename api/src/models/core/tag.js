const db = require("../db").client;

class Tag {
	//Todo:This needs to be remove, it becomes a liability when system is self service
	async getAll() {
		return db.tag.findMany();
	}

	async getById(id) {
		return db.tag.findUnique({
			where: { id: Number.parseInt(id) },
		});
	}

	async getByCampaignId(campaignId) {
		return db.tag.findMany({
			where: {
				CampaignTag: { some: { campaignId: Number.parseInt(campaignId) } },
			},
		});
	}

	async getByCampaignIdAndName(campaignId, name) {
		return db.tag.findMany({
			where: {
				CampaignTag: { some: { campaignId: Number.parseInt(campaignId) } },
				name: { contains: name, mode: "insensitive" },
			},
		});
	}

	async getByAdvertiserId(advertiserId) {
		return db.tag.findMany({
			where: {
				CampaignTag: {
					some: { campaign: { advertiserId: Number.parseInt(advertiserId) } },
				},
			},
		});
	}

	async create(tag) {
		return db.tag.create({
			data: {
				...tag,
			},
		});
	}

	async update(id, tag) {
		return db.tag.update({
			where: { id: Number.parseInt(id) },
			data: {
				...tag,
			},
		});
	}

	async delete(id) {
		return db.tag.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Tag;
