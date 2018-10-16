'use strict';
const Authentication = require('./controllers/auth');
const koaRouter = require('koa-router');
const passport = require('koa-passport');
const router = new koaRouter();

const requireAuth = passport.authenticate('jwt', { session: true });

router.get('/', requireAuth, (ctx) => {
  ctx.body = "Welcome! To the Koala Book of Everything!"
});

router.post('/register', async (ctx, next) => {
  //const user = await queries.addUser(ctx.request.body); //add user to mongoDB
  next();
}, (ctx) => {
  Authentication.signup(ctx, next)
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
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      next();
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
}, (ctx) => {
  Authentication.signin(ctx);
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

module.exports = router;
