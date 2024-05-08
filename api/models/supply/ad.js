const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Ad {
  async getAll() {
    return db.ad.findMany();
  }

  async getAdById(id) {
    return db.ad.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getAdsByCampaignId(campaignId) {
    return db.ad.findUnique({
      where: { campaignId: parseInt(campaignId) },
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