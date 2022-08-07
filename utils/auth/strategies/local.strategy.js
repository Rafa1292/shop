const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const userService = new UserService();

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await userService.findByEmail(email);
    if(!user){
      done(null, null);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      done(null, null);
    }
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(null, null);
  }
});

module.exports = LocalStrategy;
