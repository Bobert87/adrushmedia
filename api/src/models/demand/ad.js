const db = require('../db').client;

class Ad {
  async getAll() {
    return db.ad.findMany();
  }

  async getById(id) {
    return db.ad.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getByCampaignId(campaignId) {
    return db.ad.findMany({
      where: { campaignId: parseInt(campaignId) },
    });
  }

  async getByStatus(status) {
    return db.ad.findMany({
      where: { status },
    });
  }

  async getByAdvertiserId(advertiserId) {
    return db.ad.findMany({
      where: { campaign: { advertiser: { is: { id: parseInt(advertiserId) } } } }
    });
  }

  async create(ad) {
    return db.ad.create({
      data: {
        ...ad,
      },
    });
  }

  async update(id, ad) {
    return db.ad.update({
      where: { id: parseInt(id) },
      data: {
        ...ad,
      },
    });
  }

  async delete(id) {
    return db.ad.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Ad;