const db = require("../db").client;

class Asset {
	getIncludes(includes) {
		const include = {};
		if (!includes) return include;
		if (includes.indexOf("devices") > -1) include.devices = true;
		if (includes.indexOf("publishers") > -1) include.publisher = true;
		if (includes.indexOf("details") > -1)
			include.assetDetails = {
				select: {
					field: true,
					value: true,
				},
			};
		return { include };
	}
	async getAll(include) {
		return db.asset.findMany({
			...this.getIncludes(include),
		});
	}

	async getById(id, include) {
		return db.asset.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByName(name, include) {
		return db.asset.findMany({
			where: { name: { contains: name, mode: "insensitive" } },
			...this.getIncludes(include),
		});
	}

	async getByPublisherId(publisherId, include) {
		return db.asset.findMany({
			where: { publisherId: Number.parseInt(publisherId) },
			...this.getIncludes(include),
		});
	}

	async create(asset, assetDetails) {
		const assetData = asset;
		if (assetDetails) {
			assetData.assetDetails = {
				create: {
					...assetDetails,
				},
			};
		}

		return db.asset.create({
			data: {
				...assetData,
			},
		});
	}

	async update(id, asset) {
		return db.asset.update({
			where: { id: Number.parseInt(id) },
			data: {
				...asset,
			},
			include: {
				publisher: true,
				assetDetails: true,
			},
		});
	}

	async delete(id) {
		return db.asset.delete({
			where: { id: Number.parseInt(id) },
			include: {
				publisher: true,
				assetDetails: true,
			},
		});
	}
}

module.exports = Asset;
