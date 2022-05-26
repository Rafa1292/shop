const { Model, DataTypes, Sequelize } = require('sequelize');
const { SIZE_TABLE } = require('./size.model');
const { PRODUCT_TABLE } = require('./product.model');

const PRODUCT_MOVE_TABLE = 'product_moves';

const ProductMoveSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  quantity:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  sizeId: {
    field: 'size_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SIZE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  exit: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  cost:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
}

class ProductMove extends Model {
  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
    });
    this.belongsTo(models.Size, {
      as: 'size',
    });
    this.hasOne(models.InvestmentDetail,
      {
        as: 'investmentDetail',
        foreignKey: 'productMoveId'
      }
    );
    this.hasOne(models.OrderProduct,
      {
        as: 'item',
        foreignKey: 'productMoveId'
      }
    );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_MOVE_TABLE,
      modelName: 'ProductMove',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_MOVE_TABLE, ProductMoveSchema, ProductMove }
