'use strict';
const { INVESTMENT_DETAIL_TABLE, InvestmentDetailSchema } = require('../models/investmentDetail.model');
const { PRODUCT_MOVE_TABLE, ProductMoveSchema } = require('../models/productMove.model');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(INVESTMENT_DETAIL_TABLE, InvestmentDetailSchema);

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
