'use strict';
const Authentication = require('./controllers/auth');
const workout = require('./controllers/workout');
const koaRouter = require('koa-router');


module.exports = passport => {
  const router = new koaRouter();
  // const requireAuth = passport.authenticate('jwt', { session: false });

  // router.get('/user/*', requireAuth, (ctx) => {
  //   ctx.body = "Welcome! To the Koala Book of Everything!"
  // });

  router.post('/wod', workout.add);

  router.post('/register', Authentication.signup);

  router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      //ctx.redirect('/auth/login');
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  });
  router.post('/auth/login', Authentication.local(passport));
  router.post('/auth/facebook', Authentication.facebook(passport));
  router.post('/auth/google', Authentication.google(passport));

  return router;
}
