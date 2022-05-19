'use strict';
const { INVESTMENT_TABLE, InvestmentSchema } = require('../models/investment.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(INVESTMENT_TABLE, InvestmentSchema);

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
