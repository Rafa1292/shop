'use strict';

const { ACCOUNT_TABLE, AccountSchema } = require('../models/account.model');


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ACCOUNT_TABLE, AccountSchema);
  },

  async down (queryInterface, Sequelize) {

  }
};
