const { createPrismaRedisCache } = require("prisma-redis-middleware");
const Redis = require("ioredis");


const redis = new Redis({
    port: process.env.REDIS_PORT,   // Redis port
    host: process.env.REDIS_HOST,   // Redis host
    family: 4,           // 4(IPv4) or 6(IPv6)
    db: 0    
});

const cacheMiddleware = createPrismaRedisCache({
  models: [
    { model: "Advertiser", cacheTime: 3600 },    
  ],
  storage: { type: "redis", options: { client:redis, invalidation: true} },
  cacheTime: 3600,
  onHit: (key) => {
    console.log("cache hit");
  },
  onMiss: (key) => {
    console.log("cache miss");
  },
  onError: (key) => {
    console.log("cache error");
  },
});

module.exports = cacheMiddleware;