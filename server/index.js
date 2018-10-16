'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes.js');
const app = new koa();
const mongoose = require('mongoose');
const cors = require('cors');


// DB Setup
//mongoose.connect('mongodb://localhost/auth');

app.use(cors());

// body parser
app.use(bodyParser());

// authentication
require('./auth.js');

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3060)