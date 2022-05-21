'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const { ORDER_TABLE, OrderSchema } = require('../models/order.model');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');
const { PRODUCT_MOVE_TABLE, ProductMoveSchema } = require('../models/productMove.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_MOVE_TABLE, ProductMoveSchema);

    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
