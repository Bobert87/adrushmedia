const tagModel = require('../../models/core/tag');

class Tag {
    constructor() {
        this.tagModel = new tagModel();
    }

    async getAll(req, res) {
        try {
            const tags = await this.tagModel.getAll();
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

   async getById(req, res) {
        try {
            const id = req.params.id;
            const tag = await this.tagModel.getById(id);
            res.json(tag);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getByCampaignId(req, res) {
        try {
            const campaignId = req.params.campaignId;
            const tags = await this.tagModel.getByCampaignId(campaignId);
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByCampaignIdAndName(req, res) {
        try {
            const campaignId = req.params.campaignId;
            const name = req.params.name;
            const tags = await this.tagModel.getByCampaignIdAndName(campaignId, name);
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByAdvertiserId(req, res) {
        try {
            const advertiserId = req.params.advertiserId;
            const tags = await this.tagModel.getByAdvertiserId(advertiserId);
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const tag = req.body;
            const createdTag = await this.tagModel.create(tag);
            res.json(createdTag);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const tag = req.body;
            const updatedTag = await this.tagModel.update(id, tag);
            res.json(updatedTag);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedTag = await this.tagModel.delete(id);
            res.json(deletedTag)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = Tag;