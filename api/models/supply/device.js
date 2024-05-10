const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Device {
  async getAll() {
    return db.device.findMany();
  }

  async getById(id) {
    return db.device.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getByVehicleId(vehicleId) {
    return db.device.findMany({
      where: { vehicleId: parseInt(vehicleId) },
    });
  }

  async getByDriverId(driverId) {
    return db.device.findMany({
      where: { vehicle: { driver: { is: { id: parseInt(driverId) } } } },
    });
  }

  async getByCompanyId(companyId) {
    return db.device.findMany({
      where: { vehicle: { driver: { is: { companyId: parseInt(companyId) } } } },      
    });
  }

  async create(device) {
    return db.device.create({
      data: {
        ...device,
      },
    });
  }

  async update(id, device) {
    return db.device.update({
      where: { id: parseInt(id) },
      data: {
        ...device,
      },
    });
  }

  async delete(id) {
    return db.device.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Device;