'use strict';

const koaRouter = require('koa-router')
const router = new koaRouter();

router.get('koala', '/', (ctx) => {
  ctx.body = "Welcome! To the Koala Book of Everything!"
})

module.exports = router;
