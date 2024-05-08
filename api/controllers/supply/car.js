const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Car {
  async getAll() {
    return db.car.findMany();
  }

  async getCarById(id) {
    return db.car.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getCarsByDriverId(driverId) {
    return db.carDriver.findMany({
      where: { driverId: parseInt(driverId) },
      include: {
        car: true,
      },
    });
  }

  async create(car) {
    return db.car.create({
      data: {
        ...car,
      },
    });
  }

  async update(id, car) {
    return db.car.update({
      where: { id: parseInt(id) },
      data: {
        ...car,
      },
    });
  }

  async delete(id) {
    return db.car.delete({
      where: { id: parseInt(id) },
    });
  }
}