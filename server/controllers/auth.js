const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

exports.google = passport => (ctx) => {
  passport.authenticate('google-id-token', (err, user) => {
    if (!user) {
      ctx.status = 400;
      return ctx.body = { status: 'User not authenticated'}
    }
    else {
      ctx.user = user;
      ctx.status = 200;
      ctx.body = {
        token: tokenForUser(user.google)
      }
    }
  })(ctx);
}

exports.signup = function(ctx, next) {
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
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      ctx.status = ctx.status = 422;
      ctx.body = {
        message: "Email is in user"
      };
      return ctx;
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      //res.json({ token: tokenForUser(user) });
      ctx.status = 200;
      ctx.body = {
        token: tokenForUser(user)
      }
      return ctx;
    });
  });
}
