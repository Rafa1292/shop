const { Model, DataTypes, Sequelize } = require('sequelize');
const { SUBCATEGORY_TABLE } = require('./subcategory.model');
const { BRAND_TABLE } = require('./brand.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  subcategoryId: {
    field: 'subcategory_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SUBCATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  brandId: {
    field: 'brand_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: BRAND_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  primaryColorId: {
    field: 'primary_color_id',
    allowNull: false,
    type: DataTypes.INTEGER
  },
  secondaryColorId: {
    field: 'secondary_color_id',
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Subcategory,
      { as: 'subcategory' }
    );
    this.belongsTo(models.Brand,
      { as: 'brand' }
    );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
