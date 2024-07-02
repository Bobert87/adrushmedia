const db = require("../db").client;

class Advertiser {
	getIncludes(includes) {
		const include = {};
		let includeTags = false;
		let includeAds = false;
		if (!includes) return includes;
		const parsedincludes = includes.split(",");
		if (parsedincludes.indexOf("campaigns") > -1) include.campaigns = true;
		if (parsedincludes.indexOf("ads") > -1) includeAds = true;
		if (parsedincludes.indexOf("tags") > -1) includeTags = true;
		if (parsedincludes.indexOf("invoices") > -1) include.invoices = true;
		if (includeAds || includeTags)
			include.campaigns = { include: { ads: includeAds, tags: includeTags } };
		return { include: include };
	}

	getSorts(sort){
		const orderBy = {};
		orderBy[sort.key]=sort.order;
		return orderBy;
	}

	getPagination(pageSize, currentPage){
		const pagination = {
			skip: (currentPage-1)*pageSize,
			take: pageSize,
		}

		return pagination;
	}

	async getAll(options) {
		return db.advertiser.findMany({
			...this.getIncludes(options.include),
			...this.getSorts(options.sort),

		});
	}

	async getByIds(ids, include) {
		return db.advertiser.findMany({
			where: { id: { in: ids } },
			...this.getIncludes(include),
		});
	}

	async getById(id, include) {
		return db.advertiser.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByStatus(status, include) {
		return db.advertiser.findMany({
			where: { status },
			...this.getIncludes(include),
		});
	}

	async getByInvoiceStatus(status, include) {
		return db.advertiser.findMany({
			where: {
				invoices: {
					some: {
						status,
					},
				},
			},
			...this.getIncludes(include),
		});
	}

	async create(advertiser) {
		return db.advertiser.create({
			data: {
				...advertiser,
			},
		});
	}

	async update(id, advertiser) {
		return db.advertiser.update({
			where: { id: Number.parseInt(id) },
			data: {
				...advertiser,
			},
		});
	}

	async updateMany(advertisers) {
		return db.advertiser.updateMany({
			data: {
				...advertisers,
			},
		});
	}

	async delete(id) {
		return db.advertiser.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Advertiser;
