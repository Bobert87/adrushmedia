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

	/**
	 * Retrieves the sum of amount by campaign IDs and date ranges.
	 *
	 * @param {Array<number>} campaignIds - The array of campaign IDs.
	 * @param {Date} from - The start date of the date range.
	 * @param {Date} to - The end date of the date range.
	 * @returns {Promise<Array<Object>>} The sum of amount grouped by advertiser ID, campaign ID, campaign's daily budget, campaign's monthly budget, and date.
	 */
	async getAmountSumByCamapignIdsAndDateRanges(campaignIds, from, to) {
		return db.$queryRaw`
		SELECT 
    		"a"."advertiserId",
			"a"."campaignId", 	
			"c"."id" as "cId",
			"c"."status", 
			"c"."dailyBudget", 
			"c"."monthlyBudget", 
			date("a"."createdAt") AS "date",
			sum("a"."amount") AS "sumAmount"
		FROM 
    		"adrush"."AdImpression" AS "a"
    	JOIN
    		"adrush"."Campaign" AS "c"
    	ON
    		"a"."campaignId" = "c"."id"
		GROUP BY 
    		1,2,3,7
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
