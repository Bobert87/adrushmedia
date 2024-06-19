const db = require("../db").client;

class Polygon {
	async getAll() {
		return db.polygon.findMany();
	}

	async getById(id) {
		return db.polygon.findUnique({
			where: { id: Number.parseInt(id) },
		});
	}

	async getByName(name) {
		return db.polygon.findMany({
			where: { name: { contains: name, mode: "insensitive" } },
		});
	}

	async getByZoneId(zoneId) {
		return db.polygon.findMany({
			where: {
				polygonGroupPolygon: { some: { zoneId: Number.parseInt(zoneId) } },
			},
		});
	}

	async getByZoneName(zoneName) {
		return db.polygon.findMany({
			where: {
				polygonGroupPolygon: {
					some: {
						polygonZone: { name: { contains: zoneName, mode: "insensitive" } },
					},
				},
			},
		});
	}

	async create(polygon) {
		return db.polygon.create({
			data: {
				...polygon,
			},
		});
	}

	async update(id, polygon) {
		return db.polygon.update({
			where: { id: Number.parseInt(id) },
			data: {
				...polygon,
			},
		});
	}

	async delete(id) {
		return db.polygon.delete({
			where: { id: Number.parseInt(id) },
		});
	}
}

module.exports = Polygon;
