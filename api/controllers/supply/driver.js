const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Driver {
  async getAll() {
    return db.driver.findMany();
  }

  async getDriverById(id) {
    return db.driver.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getDriverByCompanyId(companyId) {
    return db.companyDriver.findMany({
      where: { companyId: parseInt(companyId) },
      include: { driver: true },
    });
  }

  async create(driver) {
    return db.driver.create({
      data: {
        ...driver,
      },
    });
  }

  async update(id, driver) {
    return db.driver.update({
      where: { id: parseInt(id) },
      data: {
        ...driver,
      },
    });
  }

  async delete(id) {
    return db.driver.delete({
      where: { id: parseInt(id) },
    });
  }
}