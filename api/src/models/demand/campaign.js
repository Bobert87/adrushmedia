const db = require("../db").client;
const { Prisma } = require("@prisma/client");

class Campaign {
	getIncludes(includes) {
		const include = {};
		if (!includes) return includes;
		const parsedincludes = includes.split(",");
		if (parsedincludes.indexOf("tags") > -1)
			include.tags = { select: { tag: true } };
		if (parsedincludes.indexOf("ads") > -1) include.ads = true;
		if (parsedincludes.indexOf("filters") > -1) include.filters = true;
		if (parsedincludes.indexOf("advertiser") > -1) include.advertiser = true;
		if (parsedincludes.indexOf("adImpressions") > -1)
			include.adImpressions = true;
		return { include: include };
	}

	async getAll(include) {
		return db.campaign.findMany({
			...this.getIncludes(include),
		});
	}

	async getById(id, include) {
		return db.campaign.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByAdvertiserId(advertiserId, include) {
		return db.campaign.findMany({
			where: { advertiserId: Number.parseInt(advertiserId) },
			...this.getIncludes(include),
		});
	}

	async getByTagName(tagName, include) {
		return db.campaign.findMany({
			where: {
				tags: {
					some: { tag: { name: { contains: tagName, mode: "insensitive" } } },
				},
			},
			...this.getIncludes(include),
		});
	}

	async getByStatus(status, include) {
		return db.campaign.findMany({
			where: { status },
			...this.getIncludes(include),
		});
	}

	async getByGeoFilterZones(zoneIds) {
		return db.campaign.findMany({
			where: {
				status: "ACTIVE",
				filters: {
					some: {
						type: "GEO",
						operation: "IN",
						value: {
							in: zoneIds
						},
					},
				},
			},
			include: {
				filters: true,
				ads: true,
			},
		});
	}

	async addTag(campaignId, tagId) {
		return db.campaignTag.create({
			data: {
				campaign: { connect: { id: Number.parseInt(campaignId) } },
				tag: { connect: { id: Number.parseInt(tagId) } },
			},
		});
	}

	async removeTag(campaignId, tagId) {
		return db.campaign.delete({
			where: {
				campaignId_tagId: {
					campaignId: Number.parseInt(campaignId),
					tagId: Number.parseInt(tagId),
				},
			},
		});
	}

	async getSpendByDateRange(campaignId, from, to) {
		return db.adImpression.aggregate({
			where: {
				campaignId: Number.parseInt(campaignId),
				createdAt: {
					between: [from, to],
				},
			},
			sum: {
				ammount: true,
			},
		});
	}
	async create(campaign) {
		return db.campaign.create({
			data: {
				...campaign,
			},
		});
	}

	async update(id, campaign) {
		return db.campaign.update({
			where: { id: Number.parseInt(id) },
			data: {
				...campaign,
			},
		});
	}

	async updateStatusByIds(ids, status) {
		return db.$queryRaw`
		UPDATE 
			"adrush"."Campaign"
		SET 
			"lastStatus" = "status",
			"status" = ${status}
		WHERE
    		"id" IN (${Prisma.join(ids)})`
	}

	async delete(id) {
		return db.campaign.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Campaign;
