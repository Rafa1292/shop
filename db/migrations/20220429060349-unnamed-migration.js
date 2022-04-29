'use strict';
const { STATE_TABLE, StateSchema } = require('../models/state.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(STATE_TABLE, StateSchema);
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
