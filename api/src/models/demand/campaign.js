const db = require('../db').client;

class Campaign {

  getIncludes(includes) {
    let include = {}
    if (!includes) return includes;
    const parsedincludes = includes.split(',')
    if (parsedincludes.indexOf('tags') > -1)      
      include.tags = { select: { tag: true } }
    if (parsedincludes.indexOf('ads') > -1)
      include.ads = true

    return { include: include };

  }
  async getAll(include) {
    return db.campaign.findMany({
      ...this.getIncludes(include),      
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

  async addTag(campaignId, tagId) {
    return db.campaignTag.create({
      data: {
        campaign: { connect: { id: parseInt(campaignId) } },
        tag: { connect: { id: parseInt(tagId) } },
      },
    });
  }

  async removeTag(campaignId, tagId) {
    return db.campaign.delete({
      where: {
        campaignId_tagId: {
          campaignId: parseInt(campaignId),
          tagId: parseInt(tagId),
        },
      },
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