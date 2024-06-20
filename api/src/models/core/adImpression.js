const { Prisma } = require("@prisma/client");

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

	async getAmountSumByCamapignIdsAndDateRanges(campaignIds, from, to) {
		return db.$queryRaw`
		SELECT 
    		"a"."advertiserId",
			"a"."campaignId", 	
			"b"."id" as "cId",		
			"b"."dailyBudget", 
			"b"."monthlyBudget", 
			date("a"."createdAt") AS "date",
			sum("a"."amount") AS "sumAmount"
		FROM 
    		"adrush"."AdImpression" AS "a"
    	JOIN
    		"adrush"."Campaign" AS "b"
    	ON
    		"a"."campaignId" = "b"."id"
		GROUP BY 
    		1,2,3,6
		HAVING 
		 	"a"."campaignId" IN (${Prisma.join(campaignIds)}) AND
		 	date("a"."createdAt") BETWEEN ${from} AND ${to};`;
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
