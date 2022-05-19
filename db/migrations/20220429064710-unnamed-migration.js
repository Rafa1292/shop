'use strict';
const { PAYMENT_TABLE, PaymentSchema } = require('../models/payment.model');
const { ENTRY_TABLE, EntrySchema } = require('../models/entry.model');
const { PAYMENT_ACCOUNTHISTORY_TABLE, PaymentAccountHistorySchema } = require('../models/payment-accountHistory.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
    await queryInterface.createTable(PAYMENT_ACCOUNTHISTORY_TABLE, PaymentAccountHistorySchema);
    await queryInterface.createTable(ENTRY_TABLE, EntrySchema);
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
