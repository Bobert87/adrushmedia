const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Vehicle {
  async getAll() {
    return db.vehicle.findMany();
  }

  async getvehicleById(id) {
    return db.vehicle.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getByDriverId(driverId) {
    return db.vehicle.findUnique({
      where: { driverId: parseInt(driverId) },      
    });
  }

  async getByCompanyId(companyId) {
    return db.vehicle.findMany({
      where: { companyId: parseInt(companyId) },     
    });
  }

  async create(vehicle) {
    return db.vehicle.create({
      data: {
        ...vehicle,
      },
    });
  }

  async update(id, vehicle) {
    return db.vehicle.update({
      where: { id: parseInt(id) },
      data: {
        ...vehicle,
      },
    });
  }

  async delete(id) {
    return db.vehicle.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Vehicle;