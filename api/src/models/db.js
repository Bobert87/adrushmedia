const { PrismaClient } = require('@prisma/client');
const cacheMiddleware = require('../config/cacheConfig');

class prismaSingleton {
    constructor() { 
        this.client = new PrismaClient();
        this.client.$use(cacheMiddleware);
    }
}
module.exports = new prismaSingleton();