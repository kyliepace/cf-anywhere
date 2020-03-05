'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv').config();
const router = require('./routes.js');
const app = new koa();
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const mongoDB = require('./config/database.js');
// const passport = require('./config/passport.js');

// app.use(passport.initialize());
// DB Setup
const dbString = mongoDB();
mongoose.connect(dbString, {useNewUrlParser: true});

app.use(cors());

// body parser
app.use(bodyParser());

// let routes = router(passport);
let routes = router();
app.use(routes.routes())
  .use(routes.allowedMethods());

app.listen(3060)