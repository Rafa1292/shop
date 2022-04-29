'use strict';
const { PAYMETHOD_TABLE, PaymethodSchema } = require('../models/paymethod.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PAYMETHOD_TABLE, PaymethodSchema);
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
