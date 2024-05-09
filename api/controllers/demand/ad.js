const adModel = require('../../models/demand/ad');

class Ad {
  constructor() {
    this.adModel = new adModel();
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const ads = await this.adModel.getById(id);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const ad = req.body;
      const createdAd = await this.adModel.create(ad);
      res.json(createdAd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const ad = req.body;
      const updatedAd = await this.adModel.update(id, ad);
      res.json(updatedAd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedAd = await this.adModel.delete(id);
      res.json(deletedAd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const ads = await this.adModel.getAll();
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCampaignId(req, res) {
    try {
      const campaignId = req.params.campaignId;
      const ads = await this.adModel.getByCampaignId(campaignId);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByAdvertiserId(req, res) {
    try {
      const advertiserId = req.params.advertiserId;      
      const ads = await this.adModel.getByAdvertiserId(advertiserId);
      res.json(ads);
      res.send('Not implemented');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Ad;