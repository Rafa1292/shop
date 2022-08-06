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
  callbackURL: 'https://limitless-hamlet-11683.herokuapp.com/api/v1/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails', 'picture',],
},
  async (accessToken, refreshToken, profile, done) => {
    let user = await userService.findByEmail(profile._json.email);
    if (!user) {
      user = await userService.create({
        email: profile._json.email,
        role: 'customer',
        password: profile.id,
        customer: {
          name: profile.displayName,
          phone: '00000000',
          maxOrders: 1
        }
      });

    }
    if(user.facebookId != profile.id.toString()){
      await userService.update(user.id,{facebookId: profile.id.toString()})
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
