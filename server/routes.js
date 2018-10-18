'use strict';
const Authentication = require('./controllers/auth');
const koaRouter = require('koa-router');


module.exports = passport => {
  const router = new koaRouter();
  const requireAuth = passport.authenticate('jwt', { session: false });

  router.get('/user/*', requireAuth, (ctx) => {
    ctx.body = "Welcome! To the Koala Book of Everything!"
  });

  router.post('/register', (ctx, next) => {
    Authentication.signup(ctx, next);
  });

  router.get('/login', async (ctx) => {
    if (!ctx.isAuthenticated()) {
      ctx.status = 400;
      ctx.body = { status: 'error' };
      // ctx.type = 'html';
      // ctx.body = fs.createReadStream('../src/server/views/login.html');
    } else {
      //ctx.redirect('/auth/status');
    }
  });

  router.post('/login', async (ctx, next) => {
    passport.authenticate('local', (err, user, info, status) => {
      saveLogIn(user, ctx, next);
    })(ctx, next),
    (ctx, next) => {
      Authentication.sendToken(ctx, next);
    }
  });


  router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      //ctx.redirect('/auth/login');
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  });

  router.post('/auth/facebook', async (ctx, next) => {
    return passport.authenticate('facebook-token', { session: false}, async (err, user, info, status) => {
      if (!user) {
        ctx.status = 400;
        return ctx.body = { status: 'User not authenticated'};
      }
      else {
        ctx.user = user;
        ctx.auth = {
          id: user.id
        };
        Authentication.sendToken(ctx, next);
      }
    })(ctx, next);
  });

  router.post('/auth/google', Authentication.google(passport));

  return router;
}
