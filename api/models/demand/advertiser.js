const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Advertiser {
  async getAll() {
    return db.advertiser.findMany();
  }

  async getAdvertiserById(id) {
    return db.advertiser.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async create(advertiser) {
    return db.advertiser.create({
      data: {
        ...advertiser,
      },
    });
  }

  async update(id, advertiser) {
    return db.advertiser.update({
      where: { id: parseInt(id) },
      data: {
        ...advertiser,
      },
    });
  }

  async delete(id) {
    return db.advertiser.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Advertiser;