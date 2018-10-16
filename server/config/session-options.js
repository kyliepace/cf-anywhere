
"use strict";
const session = require("koa-session");
const redisStore = require("koa-redis");
const config = require("./redis-file.js");

const sessionOptions = {...config};

module.exports = app => {
  return session({
    store: redisStore(sessionOptions)
  }, app);
};