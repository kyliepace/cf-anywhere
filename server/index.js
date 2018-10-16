'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes.js');
const app = new koa();
const mongoose = require('mongoose');
const cors = require('cors');
const mongoDB = require('./config/database.js');
const dotenv = require("dotenv").config();
const passport = require('./config/passport.js');


app.use(passport.initialize());
// DB Setup
mongoose.connect(mongoDB(), {useNewUrlParser: true});

//app.use(cors());

// body parser
app.use(bodyParser());

let routes = router(passport);
app.use(routes.routes())
  .use(routes.allowedMethods());

app.listen(3060)