const { Model, DataTypes, Sequelize } = require('sequelize');
const { INVESTMENT_TABLE } = require('./investment.model');
const { PRODUCT_MOVE_TABLE } = require('./productMove.model');

const INVESTMENT_DETAIL_TABLE = 'investment_details';

const InvestmentDetailSchema = {
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
  investmentId: {
    field: 'investment_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: INVESTMENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  productMoveId: {
    field: 'product_move_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_MOVE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  }
}

class InvestmentDetail extends Model {
  static associate(models) {
    this.belongsTo(models.Investment, {
      as: 'investment',
    });
    this.belongsTo(models.ProductMove, {
      as: 'productMove',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVESTMENT_DETAIL_TABLE,
      modelName: 'InvestmentDetail',
      timestamps: false
    }
  }
}

module.exports = { INVESTMENT_DETAIL_TABLE, InvestmentDetailSchema, InvestmentDetail }
