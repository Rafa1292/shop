const { Model, DataTypes, Sequelize } = require('sequelize');
const { INVENTORY_TABLE } = require('./inventory.model');
const { PRODUCT_TABLE } = require('./product.model');
const { SIZE_TABLE } = require('./size.model');

const PRODUCT_INVENTORY_TABLE = 'productInventories';

const ProductInventorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  inventoryId: {
    field: 'inventory_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: INVENTORY_TABLE,
      key: 'id'
    },
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
  },
  sizeId: {
    field: 'size_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SIZE_TABLE,
      key: 'id'
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  initialQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  finalQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  initialCost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  finalCost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}

class ProductInventory extends Model {
  static associate(models){
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: PRODUCT_INVENTORY_TABLE,
      modelName: 'ProductInventory',
      timestamps: false
    }
  }
}

module.exports = {PRODUCT_INVENTORY_TABLE, ProductInventorySchema, ProductInventory}
