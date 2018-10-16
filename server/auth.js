'use strict';
const passport = require('koa-passport');

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  // return knex('users').where({id}).first()
  // .then((user) => { done(null, user); })
  // .catch((err) => { done(err,null); });
});