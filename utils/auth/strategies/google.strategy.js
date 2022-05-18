const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('../../../config/config')

const userService = new UserService();

const GoogleStrategyAuth = new GoogleStrategy({
  clientID: '896786655761-44p5urae0bvtm54ssv7tq2a5l0mekj7g.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user = await userService.findByEmail(profile._json.email);
    if (!user) {
      user = userService.create({
        email: profile._json.email,
        password: profile.id,
        role: 'customer',
        customer: {
          name: profile.displayName,
          phone: '00000000',
          maxOrders: 1
        }
      });
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
