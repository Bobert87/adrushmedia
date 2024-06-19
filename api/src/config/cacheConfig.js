const { createPrismaRedisCache } = require("prisma-redis-middleware");
const Redis = require("ioredis");

const redis = new Redis({
	port: process.env.REDIS_PORT, // Redis port
	host: process.env.REDIS_HOST, // Redis host
	family: 4, // 4(IPv4) or 6(IPv6)
	db: 0,
});

const cacheMiddleware = createPrismaRedisCache({
	models: [
		{ model: "Advertiser", cacheTime: 3600 },
		{ model: "Invoice", cacheTime: 3600 },
		{ model: "Schedule", excludeMethods: ["findFirst"] },
	],
	storage: { type: "redis", options: { client: redis, invalidation: true } },
	excludeMethods: ["findFirst"],
	cacheTime: 3600,
});

module.exports = cacheMiddleware;
