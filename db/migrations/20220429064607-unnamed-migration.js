'use strict';
const { ACCOUNT_HISTORY_TABLE, AccountHistorySchema } = require('../models/account-history.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ACCOUNT_HISTORY_TABLE, AccountHistorySchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
