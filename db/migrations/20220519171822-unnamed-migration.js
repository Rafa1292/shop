'use strict';
const { COST_TABLE, CostSchema } = require('../models/cost.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(COST_TABLE, CostSchema);

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
