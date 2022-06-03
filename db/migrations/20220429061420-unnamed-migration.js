'use strict';
const { ORDER_STATE_TABLE, OrderStateSchema } = require('../models/order-state.model');

module.exports = {
  async up (queryInterface, Sequelize) {
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
