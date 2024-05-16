const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

class Polygon {
    async getAll() {
        return db.polygon.findMany();
    }

    async getById(id) {
        return db.polygon.findUnique({
            where: { id: parseInt(id) },
        });
    }

    async getByName(name) {
        return db.polygon.findMany({
            where: { name: { contains: name, mode:"insensitive" } },
        });
    }

    async getByPolygonGroupId(polygonGroupId) {
        return db.polygon.findMany({
            where: {
                polygonGroupPolygon: { some: { polygonGroupId: parseInt(polygonGroupId) } },
            }
        });
    }

    async  getByPolygonGroupName(polygonGroupName) {
        return db.polygon.findMany({
            where: {
                polygonGroupPolygon: { some: { polygonGroup: { name: { contains: polygonGroupName, mode: 'insensitive' } } } },
            }
        });
    }

    async create(polygon) {
        return db.polygon.create({
            data: {
                ...polygon,
            },
        });
    }

    async update(id, polygon) {
        return db.polygon.update({
            where: { id: parseInt(id) },
            data: {
                ...polygon,
            },
        });
    }

    async delete(id) {
        return db.polygon.delete({
            where: { id: parseInt(id) },
        });
    }
}

module.exports = Polygon;