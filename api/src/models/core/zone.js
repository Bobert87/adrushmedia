const db = require('../db').client;

class Zone {

    getIncludes(includes){
        let include = {}
        if (!includes) return includes;
        const parsedincludes = includes.split(',')
        if (parsedincludes.indexOf('areas') > -1)
            include.areas = {include: {polygon: true}}
        return {include}
    }
    async getAll(include) {        
        return db.zone.findMany({
            ...this.getIncludes(include)
        });
    }

    async getById(id,include) {
        return db.zone.findUnique({
            where: { id: parseInt(id) },
            ...this.getIncludes(include)    
        });
    }

    async getByName(name) {
        return db.zone.findMany({
            where: { name: { contains: name, mode: 'insensitive' } },
            ...this.getIncludes(include)
        });
    }

    async create(zone) {
        return db.zone.create({
            data: {
                ...zone,
            },
        });
    }

    async addPolygon(zoneId, polygonId) {
        return db.polygonZone.create({
            data: {
                zone: { connect: { id: parseInt(zoneId) } },
                polygon: { connect: { id: parseInt(polygonId) } },
            },
        });        
    }

    async removePolygon(zoneId, polygonId) {
        return db.polygonZone.delete({
            where: {
                zoneId_polygonId: {
                    zoneId: parseInt(zoneId),
                    polygonId: parseInt(polygonId),
                },
            },
        })
    }

    async update(id, zone) {
        return db.zone.update({
            where: { id: parseInt(id) },
            data: {
                ...zone,
            },
        });
    }

    async delete(id) {
        return db.zone.delete({
            where: { id: parseInt(id) },
        });
    }

}

module.exports = Zone;