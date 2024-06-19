const db = require("../db").client;

class Zone {
	getIncludes(includes) {
		const include = {};
		if (!includes) return includes;
		const parsedincludes = includes.split(",");
		if (parsedincludes.indexOf("areas") > -1)
			include.areas = { include: { polygon: true } };
		return { include: include };
	}
	async getAll(include) {
		return db.zone.findMany({
			...this.getIncludes(include),
		});
	}

	async getById(id, include) {
		return db.zone.findUnique({
			where: { id: Number.parseInt(id) },
			...this.getIncludes(include),
		});
	}

	async getByIds(ids, include) {
		return db.zone.findMany({
			where: { id: { in: ids } },
			...this.getIncludes(include),
		});
	}

	async getByName(name, include) {
		return db.zone.findMany({
			where: { name: { contains: name, mode: "insensitive" } },
			...this.getIncludes(include),
		});
	}

	async create(zone) {
		return db.zone.create({
			data: {
				...zone,
			},
		});
	}

	async addPolygon(zoneId, polygonId) {
		return db.polygonZone.create({
			data: {
				zone: { connect: { id: Number.parseInt(zoneId) } },
				polygon: { connect: { id: Number.parseInt(polygonId) } },
			},
		});
	}

	async removePolygon(zoneId, polygonId) {
		return db.polygonZone.delete({
			where: {
				zoneId_polygonId: {
					zoneId: Number.parseInt(zoneId),
					polygonId: Number.parseInt(polygonId),
				},
			},
		});
	}

	async update(id, zone) {
		return db.zone.update({
			where: { id: Number.parseInt(id) },
			data: {
				...zone,
			},
		});
	}

	async delete(id) {
		return db.zone.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Zone;
