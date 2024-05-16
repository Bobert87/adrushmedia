const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class PolygonGroup {
    async getAll() {
        return db.polygonGroup.findMany();
    }

    async getById(id) {
        return db.polygonGroup.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async getByName(name) {
        return db.polygonGroup.findMany({
            where: { name: { contains: name, mode: 'insensitive' } },
        });
    }

    async create(polygonGroup) {
        return db.polygonGroup.create({
            data: {
                ...polygonGroup,
            },
        });
    }

    async update(id, polygonGroup) {
        return db.polygonGroup.update({
            where: { id: parseInt(id) },
            data: {
                ...polygonGroup,
            },
        });
    }

    async delete(id) {
        return db.polygonGroup.delete({
            where: { id: parseInt(id) },
        });
    }

}

module.exports = PolygonGroup;