const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Campaign {
  async getAll() {
    return db.campaign.findMany();
  }

  async getCampaignById(id) {
    return db.campaign.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getCampaignsByAdvertiserId(advertiserId) {
    return db.campaign.findMany({
      where: { advertiserId: parseInt(advertiserId) },
    });
  }

  async create(campaign) {
    return db.campaign.create({
      data: {
        ...campaign,
      },
    });
  }

  async update(id, campaign) {
    return db.campaign.update({
      where: { id: parseInt(id) },
      data: {
        ...campaign,
      },
    });
  }

  async delete(id) {
    return db.campaign.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Campaign;