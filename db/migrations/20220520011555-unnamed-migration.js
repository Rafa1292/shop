'use strict';
const { INVESTMENT_ACCOUNTHISTORY_TABLE, InvestmentAccountHistorySchema } = require('../models/investment-accountHistory.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(INVESTMENT_ACCOUNTHISTORY_TABLE, InvestmentAccountHistorySchema);

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
