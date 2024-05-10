const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Driver {
  async getAll() {
    return db.driver.findMany();
  }

  async getById(id) {
    return db.driver.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async getByCompanyId(companyId) {
    return db.driver.findMany({
      where: { vehicle: { company: { is: { companyId: parseInt(companyId) } } } },
      include:{
        company: true,
        vehicle: true,
      }
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

module.exports = Driver;