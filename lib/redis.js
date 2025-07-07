import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // Set REDIS_URL in your .env

export default redis;