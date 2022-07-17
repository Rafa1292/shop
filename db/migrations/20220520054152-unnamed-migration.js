'use strict';
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');
const { INVENTORY_TABLE, InventorySchema } = require('../models/inventory.model');
const { PRODUCT_INVENTORY_TABLE, ProductInventorySchema } = require('../models/productInventory.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.createTable(INVENTORY_TABLE, InventorySchema);
    await queryInterface.createTable(PRODUCT_INVENTORY_TABLE, ProductInventorySchema);

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
