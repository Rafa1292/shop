const { Model, DataTypes, Sequelize } = require('sequelize');
const { INVESTMENT_TABLE } = require('./investment.model');
const { ACCOUNT_HISTORY_TABLE } = require('./account-history.model');

const INVESTMENT_ACCOUNTHISTORY_TABLE = 'investment_AccountHistories';

const InvestmentAccountHistorySchema = {
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
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER
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
  accountHistoryId: {
    field: 'account_history_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACCOUNT_HISTORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  }
}

class InvestmentAccountHistory extends Model {
  static associate(models) {
    this.belongsTo(models.AccountHistory, {as: 'accountHistory'});

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVESTMENT_ACCOUNTHISTORY_TABLE,
      modelName: 'InvestmentAccountHistory',
      timestamps: false
    }
  }
}

module.exports = { INVESTMENT_ACCOUNTHISTORY_TABLE, InvestmentAccountHistorySchema, InvestmentAccountHistory }
