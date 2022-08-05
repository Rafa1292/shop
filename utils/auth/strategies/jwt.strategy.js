const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "JaqwmosACYH1BZtvyKjND6bgQRSE4OkV"
}

const JwtStrategy = new Strategy(options, (payload, done)=>{
  return done(null, payload);
});

module.exports = JwtStrategy;
