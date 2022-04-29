'use strict';
const { PAYMENT_TABLE, PaymentSchema } = require('../models/payment.model');
const { PAYMENT_ACCOUNTHISTORY_TABLE, PaymentAccountHistorySchema } = require('../models/payment-accountHistory.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
    await queryInterface.createTable(PAYMENT_ACCOUNTHISTORY_TABLE, PaymentAccountHistorySchema);
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
