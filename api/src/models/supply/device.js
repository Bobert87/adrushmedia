const db = require('../db').client;

class Device {

  getIncludes(includes) {
    let include = {}
    if (!includes) return include;
    if (includes.indexOf('assets') > -1)
      include.asset = {include: {publisher: true}}
    if (includes.indexOf('assetDetails') > -1)
      include.asset = {include: {publisher: true, assetDetails: true}}
    return { include: include}
  }

  async getAll(include) {
    return db.device.findMany({      
      ...this.getIncludes(include)
    });
  }

  async getById(id, include) {
    return db.device.findUnique({
      where: { id: parseInt(id) },
      ...this.getIncludes(include)
    });
  }

  async getByAssetId(assetId, include) {
    return db.device.findMany({
      where: { assetId: parseInt(assetId) },
      ...this.getIncludes(include)
    });
  }

  async getAssetByPublisherId(publisherId, include) {
    return db.device.findMany({
      where: { asset: { publisherId: parseInt(publisherId) } },
      ...this.getIncludes(include)
    });
  }

  async create(device) {
    return db.device.create({
      data: {
        ...device
      }
    });
  }

  async update(id, device) {
    return db.device.update({
      where: { id: parseInt(id) },
      data: {
        ...device
      }
    });
  }

  async delete(id) {
    return db.device.delete({
      where: { id: parseInt(id) }
    });
  }

  async deleteByAssetId(assetId) {
    return db.device.deleteMany({
      where: { assetId: parseInt(assetId) }
    });
  }


}
module.exports = Device;