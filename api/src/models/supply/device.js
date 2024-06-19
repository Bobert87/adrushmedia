const db = require("../db").client;

class Device {
	getIncludes(includes) {
		const include = {};
		if (!includes) return include;
		if (includes.indexOf("assets") > -1)
			include.asset = { include: { publisher: true } };
		if (includes.indexOf("assetDetails") > -1)
			include.asset = { include: { publisher: true, assetDetails: true } };
		return { include: include };
	}

	async getAll(include) {
		return db.device.findMany({
			...this.getIncludes(include),
		});
	}

	async getById(id, include) {
		return db.device.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByAssetId(assetId, include) {
		return db.device.findMany({
			where: { assetId: Number.parseInt(assetId) },
			...this.getIncludes(include),
		});
	}

	async getAssetByPublisherId(publisherId, include) {
		return db.device.findMany({
			where: { asset: { publisherId: Number.parseInt(publisherId) } },
			...this.getIncludes(include),
		});
	}

	async create(device) {
		return db.device.create({
			data: {
				...device,
			},
		});
	}

	async update(id, device) {
		return db.device.update({
			where: { id: Number.parseInt(id) },
			data: {
				...device,
			},
		});
	}

	async delete(id) {
		return db.device.delete({
			where: { id: Number.parseInt(id) },
		});
	}

	async deleteByAssetId(assetId) {
		return db.device.deleteMany({
			where: { assetId: Number.parseInt(assetId) },
		});
	}
}
module.exports = Device;
