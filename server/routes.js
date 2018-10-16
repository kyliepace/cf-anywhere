'use strict';
const Authentication = require('./controllers/auth');
const koaRouter = require('koa-router');

const saveLogIn = (user, ctx, next) => {
  if (user) {
    ctx.login(user);
    next();
  } else {
    ctx.status = 400;
    ctx.body = { status: 'error' };
  }
};


module.exports = passport => {
  const router = new koaRouter();
  const requireAuth = passport.authenticate('jwt', { session: true });


  router.post('/register', (ctx, next) => {
    Authentication.signup(ctx, next);
  });

  router.get('/', requireAuth, (ctx) => {
    ctx.body = "Welcome! To the Koala Book of Everything!"
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

  // facebook routes
  router.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope : ['public_profile', 'email']
    })
  );

  router.get('/auth/facebook/callback', (ctx, next) => {
    passport.authenticate('facebook', (err, user, info, status) => {
      saveLogIn(user, ctx, next);
    })(ctx, next),
    (ctx, next) => Authentication.sendToken(ctx, next)
  });


  // google routes
  router.get('/auth/google',
    passport.authenticate('google', {
      scope : ['profile', 'email']
    })
  );

  router.get('/auth/google/callback', (ctx, next) => {
    passport.authenticate('google', (err, user, info, status) => {
      saveLogIn(user, ctx, next);
    });
    Authentication.sendToken(ctx);
  });
  return router;
}
