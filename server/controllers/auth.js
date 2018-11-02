const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  console.log('user: ', user);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

const onAuth = (ctx, type) => (err, user) => {
  if (!user) {
    console.log(err);
    ctx.status = 400;
    return ctx.body = { status: 'User not authenticated'}
  }
  else {
    console.log(`authenticated ${type} user ${user[type].id}`);
    ctx.user = user;
    ctx.status = 200;
    ctx.body = {
      token: tokenForUser(user[type])
    }
    return ctx;
  }
};

exports.google = passport => ctx => {
  let afterAuth = onAuth(ctx, 'google');
  return passport.authenticate('google-id-token', afterAuth)(ctx);
};

exports.facebook = passport => ctx => {
  let afterAuth = onAuth(ctx, 'facebook');
  return passport.authenticate('facebook-token', afterAuth)(ctx);
};

exports.local = passport => ctx => {
  let afterAuth = onAuth(ctx, 'local');
  return passport.authenticate('local', afterAuth)(ctx);
};

exports.signup = async (ctx, next) => {
  let afterAuth = onAuth(ctx, 'local');

  try {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;

    if (!email || !password) {
      ctx.status = 422;
      ctx.body = {
        error: "You must provide email and password"
      }
      return ctx;
    }

    // See if a user with the given email exists
    let existingUser = await User.findOne({ 'local.email': email});
    if (existingUser) {
      ctx.status = ctx.status = 422;
      ctx.body = {
        error: "Email is in user"
      };
      return ctx;
    }
    // If a user with email does NOT exist, create and save user record
    let newUser = new User();
    newUser.local.email = email;
    newUser.local.password = password;
    newUser.local.id = newUser._id;

    let user = await newUser.save();
    return afterAuth(null, newUser);
  }
  catch(err) {
    console.log(err);
    return afterAuth(err);
  }

}
