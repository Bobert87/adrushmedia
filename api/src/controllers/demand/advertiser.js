const advertiserModel = require('../../models/demand/advertiser');

class Advertiser {
  constructor() {
    this.advertiserModel = new advertiserModel();
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const include = req.query.include;
      const advertiser = await this.advertiserModel.getById(id,include);
      res.json(advertiser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByStatus(req, res) {
    try {
      const status = req.params.status;
      const include = req.query.include;
      const advertiser = await this.advertiserModel.getByStatus(status,include);
      res.json(advertiser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const advertiser = req.body;
      const createdAdvertiser = await this.advertiserModel.create(advertiser);
      res.json(createdAdvertiser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const advertiser = req.body;
      const updatedAdvertiser = await this.advertiserModel.update(id, advertiser);
      res.json(updatedAdvertiser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedAdvertiser = await this.advertiserModel.delete(id);
      res.json(deletedAdvertiser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const include = req.query.include;
      const advertisers = await this.advertiserModel.getAll(include);
      res.json(advertisers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Advertiser;  