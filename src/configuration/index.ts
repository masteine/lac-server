const port = process.env.PORT || 3002;
const host = process.env.HOST || "localhost";
const sessionSecret =
  process.env.SESSION_SECRET || "life-activity||session-secret-key";
const secretKey = process.env.SECRET_KEY || "lifeActivity node js";
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || "localhost";

export { port, host, sessionSecret, secretKey, redisPort, redisHost };
