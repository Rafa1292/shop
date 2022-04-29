const { Model, DataTypes, Sequelize } = require('sequelize');
const { SIZE_TABLE } = require('./size.model');

const PRODUCT_SIZE_TABLE = 'products_sizes';

const ProductSizeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
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
  // productInventoryId: {
  //   field: 'product_inventory_id',
  //   allowNull: false,
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: PRODUCT_TABLE,
  //     key: 'id'
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL'

  // }
}

class ProductSize extends Model {
  static associate(models) {
    this.belongsTo(models.Size,{
      as: "size"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_SIZE_TABLE,
      modelName: 'ProductSize',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_SIZE_TABLE, ProductSizeSchema, ProductSize }
