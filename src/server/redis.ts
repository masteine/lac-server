// import redis from "redis";
// import session from "express-session";
import { redisHost, redisPort } from "../configuration";
import connectRedis from "connect-redis";
const session = require("express-session");
const redis = require("redis");

const redisClient = redis.createClient({
  port: redisPort,
  host: redisHost
});

redisClient.on("error", function (err) {
  console.warn("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

const RedisStore = connectRedis(session);

export { redisClient, RedisStore };
