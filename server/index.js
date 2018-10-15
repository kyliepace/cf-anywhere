'use strict';

const koa = require('koa');
const router = require('./routes.js');
const app = new koa();

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3060)