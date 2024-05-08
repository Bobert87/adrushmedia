const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Company {
  async getAll() {
    return db.company.findMany();
  }

  async getCompanyById(id) {
    return db.company.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async create(company) {
    return db.company.create({
      data: {
        ...company,
      },
    });
  }

  async update(id, company) {
    return db.company.update({
      where: { id: parseInt(id) },
      data: {
        ...company,
      },
    });
  }

  async delete(id) {
    return db.company.delete({
      where: { id: parseInt(id) },
    });
  }
}