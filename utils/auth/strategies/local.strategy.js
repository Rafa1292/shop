const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const userService = new UserService();

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    console.log('localstrategy')
    const user = await userService.findByEmail(email);
    if(user){
      console.log('hay usuario')
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch){
        console.log('coincide')
        delete user.dataValues.password;
        done(null, user);
      }
    }
    console.log('bateando')
    done(null, {error: true});
  } catch (error) {
    console.log('cagada')
    done(null, null);
  }
});

module.exports = LocalStrategy;
