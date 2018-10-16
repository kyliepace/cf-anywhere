"use strict";

const env = process.env.NODE_ENV;
const redisUrl = process.env.REDIS_URL;
let redisClient = require("redis").createClient(redisUrl);

redisClient.on("connect", () => {
  console.log("connected to redis successfully");
});

redisClient.on("error", err => {
  throw new Error(`Error connecting to REDIS with REDIS_URL = ${redisUrl} `);
});

let fileConfig;
try {
  fileConfig = require("./redis.json")[env];
} catch (e) {
  if (!redisUrl) {
    throw new Error(
      `No redis config found at redis.json for ${env}`
    );
  }
}

let config;

if (redisUrl) {
  config = {
    client: redisClient,
    url: redisUrl,
    logErrors: true,
    ttl: process.env.REDIS_TTL ? process.env.REDIS_TTL : 1800
  };
} else {
  //read from local - Development Only
  config = {
    client: redisClient,
    port: fileConfig.port,
    host: fileConfig.host,
    ttl: 600
  };
}

module.exports = config;
