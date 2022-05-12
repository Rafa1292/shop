const { Model, DataTypes, Sequelize } = require('sequelize');
const { PAYMETHOD_TABLE } = require('./paymethod.model');

const ACCOUNT_HISTORY_TABLE = 'accountHistories';

const AccountHistorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  paymethodId: {
    field: 'paymethod_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PAYMETHOD_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  debit: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class AccountHistory extends Model {
  static associate(models) {
    this.hasOne(models.PaymentAccountHistory, {
      as: 'paymentAccountHistory',
      foreignKey: 'accountHistoryId'
    });
    this.belongsTo(models.Paymethod, {as: 'paymethod'});

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCOUNT_HISTORY_TABLE,
      modelName: 'AccountHistory',
      timestamps: false
    }
  }
}

module.exports = { ACCOUNT_HISTORY_TABLE, AccountHistorySchema, AccountHistory }
