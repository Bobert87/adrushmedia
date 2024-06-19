const polygonModel = require("../../models/core/polygon");

class Polygon {
	constructor() {
		this.polygon = new polygonModel();
	}

	async getAll(req, res) {
		try {
			const polygons = await this.polygonModel.getAll();
			res.json(polygons);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const id = req.params.id;
			const polygon = await this.polygonModel.getById(id);
			res.json(polygon);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByName(req, res) {
		try {
			const name = req.params.name;
			const polygons = await this.polygonModel.getByName(name);
			res.json(polygons);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByZoneId(req, res) {
		try {
			const polygonGroupId = req.params.polygonGroupId;
			const polygons =
				await this.polygonModel.getByPolygonGroupId(polygonGroupId);
			res.json(polygons);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByZoneName(req, res) {
		try {
			const polygonGroupName = req.params.name;
			const polygons =
				await this.polygonModel.getByPolygonGroupName(polygonGroupName);
			res.json(polygons);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const polygon = req.body;
			if (polygon.points.length < 2)
				throw new Error("Polygon must have at least 2 points");
			if (polygon.points.length % 2 !== 0)
				throw new Error("Polygon must have an even number of points");
			const createdPolygon = await this.polygonModel.create(polygon);
			res.json(createdPolygon);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const polygon = req.body;
			if (polygon.points.length < 2)
				throw new Error("Polygon must have at least 2 points");
			if (polygon.points.length % 2 !== 0)
				throw new Error("Polygon must have an even number of points");
			const updatedPolygon = await this.polygonModel.update(id, polygon);
			res.json(updatedPolygon);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const deletedPolygon = await this.polygonModel.delete(id);
			res.json(deletedPolygon);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Polygon;
