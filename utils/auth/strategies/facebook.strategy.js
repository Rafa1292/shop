const FacebookStrategy = require('passport-facebook');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const passport = require('passport');
const userService = new UserService();
const jwt = require('jsonwebtoken');
const {config} = require('../../../config/config')

const FacebookStrategyAuth = new FacebookStrategy({
  clientID: '335432078671111',
  clientSecret: 'bebf15d5360ba22705520c5f139ce33e',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails', 'picture',],
},
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile._json.email)
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

module.exports = FacebookStrategyAuth;
