'use strict';
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { SUBCATEGORY_TABLE, SubcategorySchema } = require('../models/subcategory.model');
const { COLOR_TABLE, ColorSchema } = require('../models/color.model');
const { BRAND_TABLE, BrandSchema } = require('../models/brand.model');
const { SIZE_TABLE, SizeSchema } = require('../models/size.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { PRODUCT_SIZE_TABLE, ProductSizeSchema } = require('../models/product-size.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(SUBCATEGORY_TABLE, SubcategorySchema);
    await queryInterface.createTable(COLOR_TABLE, ColorSchema);
    await queryInterface.createTable(BRAND_TABLE, BrandSchema);
    await queryInterface.createTable(SIZE_TABLE, SizeSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(PRODUCT_SIZE_TABLE, ProductSizeSchema);
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
