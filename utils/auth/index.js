const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const FacebookStrategyAuth = require('./strategies/facebook.strategy');
const GoogleStrategyAuth = require('./strategies/google.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(JwtStrategy);
passport.use(LocalStrategy);
passport.use(FacebookStrategyAuth);
passport.use(GoogleStrategyAuth);
