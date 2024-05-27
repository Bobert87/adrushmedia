const db = require('../db').client;

class Advertiser {

  getIncludes(includes) {
    let include = {}
    let includeTags = false;
    let includeAds = false;
    if (!includes) return includes;
    const parsedincludes = includes.split(',')    
    if (parsedincludes.indexOf('campaigns') > -1)
      include.campaigns = true
    if (parsedincludes.indexOf('ads') > -1)
      includeAds = true
    if (parsedincludes.indexOf('tags') > -1)
      includeTags = true
    if (includeAds || includeTags)
      include.campaigns = { include: { ads: includeAds , tags: includeTags} }   
    return { include: include };

  }

  async getAll(include) {
    return db.advertiser.findMany({
      ...this.getIncludes(include),
    });
  }

  async getById(id,include) {
    return db.advertiser.findUnique({
      where: { id: parseInt(id) },
      ...this.getIncludes(include)
    });
  }

  async getByStatus(status,include) {
    return db.advertiser.findMany({
      where: { status },
      ...this.getIncludes(include)
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