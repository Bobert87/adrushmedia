const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Device {
  async getAll() {
    return db.device.findMany();
  }

  async getDeviceById(id) {
    return db.device.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getDevicesByCarId(carId) {
    return db.carDevice.findMany({
      where: { carId: parseInt(carId) },
      include: {
        device: true,
      },
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