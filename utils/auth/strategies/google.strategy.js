const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../../../config/config')

const userService = new UserService();

const GoogleStrategyAuth = new GoogleStrategy({
  clientID: '80463080256-gn7pp8ep5se7oaofasf7kk967umdl5q3.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'https://limitless-hamlet-11683.herokuapp.com/api/v1/auth/google/callback',
  profileFields: ['id', 'displayName', 'emails', 'picture',],
},
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user = await userService.findByEmail(profile._json.email);
    if (!user) {
      user = await userService.create({
        email: profile._json.email,
        role: 'customer',
        googleId: profile.id.toString(),
        password: profile.id,
        customer: {
          name: profile.displayName ? profile.displayName : profile._json.email,
          phone: '00000000',
          maxOrders: 1
        }
      });
    }
    else {
      if (user.googleId != profile.id.toString()) {
        await userService.update(user.id, { googleId: profile.id.toString() })
      }
    }

    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    done(null, token);
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = GoogleStrategyAuth;
