const campaignModel = require("../../models/demand/campaign");

class Campaign {
	constructor() {
		this.campaignModel = new campaignModel();
	}

	async getByAdvertiserId(req, res) {
		try {
			const advertiserId = req.params.advertiserId;
			const include = req.query.include;
			const campaigns = await this.campaignModel.getByAdvertiserId(
				advertiserId,
				include,
			);
			res.json(campaigns);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async getById(req, res) {
		try {
			const id = req.params.id;
			const include = req.query.include;
			const campaign = await this.campaignModel.getById(id, include);
			res.json(campaign);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByTagName(req, res) {
		try {
			const tagName = req.params.tagName;
			const include = req.query.include;
			const campaigns = await this.campaignModel.getByTagName(tagName, include);
			res.json(campaigns);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByStatus(req, res) {
		try {
			const status = req.params.status;
			const include = req.query.include;
			const campaigns = await this.campaignModel.getByStatus(status, include);
			res.json(campaigns);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const campaign = req.body;
			const createdCampaign = await this.campaignModel.create(campaign);
			res.json(createdCampaign);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const campaign = req.body;
			const updatedCampaign = await this.campaignModel.update(id, campaign);
			res.json(updatedCampaign);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const deletedCampaign = await this.campaignModel.delete(id);
			res.json(deletedCampaign);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const include = req.query.include;
			const campaigns = await this.campaignModel.getAll(include);
			res.json(campaigns);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Campaign;
