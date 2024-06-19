const deviceModel = require("../../models/supply/device");

class Device {
	constructor() {
		this.deviceModel = new deviceModel();
	}

	async getAll(req, res) {
		try {
			const include = req.query.include;
			const devices = await this.deviceModel.getAll(include);
			res.json(devices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const id = req.params.id;
			const include = req.query.include;
			const device = await this.deviceModel.getById(id, include);
			res.json(device);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByAssetId(req, res) {
		try {
			const assetId = req.params.assetId;
			const include = req.query.include;
			const devices = await this.deviceModel.getByAssetId(assetId, include);
			res.json(devices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByPublisherId(req, res) {
		try {
			const publisherId = req.params.publisherId;
			const include = req.query.include;
			const devices = await this.deviceModel.getByPublisherId(
				publisherId,
				include,
			);
			res.json(devices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const device = req.body;
			const createdDevice = await this.deviceModel.create(device);
			res.json(createdDevice);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const device = req.body;
			const updatedDevice = await this.deviceModel.update(id, device);
			res.json(updatedDevice);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			await this.deviceModel.delete(id);
			res.json({ deleted: true });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteByAssetId(req, res) {
		try {
			const assetId = req.params.assetId;
			await this.deviceModel.deleteByAssetId(assetId);
			res.json({ deleted: true });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Device;
