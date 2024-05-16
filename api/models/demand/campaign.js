const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Campaign {

  getIncludes(includes) {
    let include = {}
    if (!includes) return includes;
    const parsedincludes = includes.split(',')
    if (parsedincludes.indexOf('tags') > -1)
      include.tags = { include: { tag: true } }
    if (parsedincludes.indexOf('targets') > -1)
      include.targets = true;
    if (parsedincludes.indexOf('zones') > -1)
      include.targets = { include: { zone: true } }
    if (parsedincludes.indexOf('areas') > -1)
      include.targets = { include: { zone: { include: { areas: true } } } }
    if (parsedincludes.indexOf('polygons') > -1)
      include.targets = { include: { zone: { include: { areas: { include: { polygon: true } } } } } }

    return { include: include };

  }
  async getAll(include) {
    return db.campaign.findMany({
      ...this.getIncludes(include),
      take: 10,      
    });
  }

  async getById(id,include) {    
    return db.campaign.findUnique({
      where: { id: parseInt(id) },
      ...this.getIncludes(include)
    });
  }

  async getByAdvertiserId(advertiserId,include) {
    return db.campaign.findMany({
      where: { advertiserId: parseInt(advertiserId) },
      ...this.getIncludes(include)
    });
  }

  async getByTagName(tagName,include) {
    return db.campaign.findMany({
      where: {
        tags: { some: { tag: { name: { contains: tagName, mode: "insensitive" } } } },
      },
      ...this.getIncludes(include)
    });
  }

  async getByStatus(status,include) {
    return db.campaign.findMany({
      where: { status },
      ...this.getIncludes(include)
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