const zoneModel = require("../../models/core/zone");

class Zone {
	constructor() {
		this.zoneModel = new zoneModel();
	}

	async getAll(req, res) {
		try {
			const include = req.query.include;
			const zones = await this.zoneModel.getAll(include);
			res.json(zones);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const id = req.params.id;
			const include = req.query.include;
			const zone = await this.zoneModel.getById(id, include);
			res.json(zone);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByName(req, res) {
		try {
			const name = req.params.name;
			const include = req.query.include;
			const zones = await this.zoneModel.getByName(name, include);
			res.json(zones);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const zone = req.body;
			const createdZone = await this.zoneModel.create(zone);
			res.json(createdZone);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const zone = req.body;
			const updatedZone = await this.zoneModel.update(id, zone);
			res.json(updatedZone);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const deletedZone = await this.zoneModel.delete(id);
			res.json(deletedZone);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Zone;
