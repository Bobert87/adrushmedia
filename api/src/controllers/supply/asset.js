const assetModel = require("../../models/supply/asset");

class Asset {
	constructor() {
		this.assetModel = new assetModel();
	}

	async getAll(req, res) {
		try {
			const include = req.query.include;
			const assets = await this.assetModel.getAll(include);
			res.json(assets);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const id = req.params.id;
			const include = req.query.include;
			const asset = await this.assetModel.getById(id, include);
			res.json(asset);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByPublisherId(req, res) {
		try {
			const publisherId = req.params.publisherId;
			const include = req.query.include;
			const assets = await this.assetModel.getByPublisherId(
				publisherId,
				include,
			);
			res.json(assets);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	// async getByPublisherName(req, res) {
	//     try {
	//     const publisherName = req.params.name;
	//     const assets = await this.assetModel.getByPublisherName(publisherName);
	//     res.json(assets);
	//     } catch (error) {
	//     res.status(500).json({ error: error.message });
	//     }
	// }

	async create(req, res) {
		try {
			const asset = req.body;
			const createdAsset = await this.assetModel.create(asset);
			res.json(createdAsset);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const asset = req.body;
			const updatedAsset = await this.assetModel.update(id, asset);
			res.json(updatedAsset);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const deletedAsset = await this.assetModel.delete(id);
			res.json(deletedAsset);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Asset;
