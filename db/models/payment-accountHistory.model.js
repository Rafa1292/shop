const { Model, DataTypes, Sequelize } = require('sequelize');
const { PAYMENT_TABLE } = require('./payment.model');
const { ACCOUNT_HISTORY_TABLE } = require('./account-history.model');

const PAYMENT_ACCOUNTHISTORY_TABLE = 'payments_AccountHistories';

const PaymentAccountHistorySchema = {
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
  paymentId: {
    field: 'payment_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PAYMENT_TABLE,
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

class PaymentAccountHistory extends Model {
  static associate(models) {
    this.belongsTo(models.AccountHistory, {as: 'accountHistory'});

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_ACCOUNTHISTORY_TABLE,
      modelName: 'PaymentAccountHistory',
      timestamps: false
    }
  }
}

module.exports = { PAYMENT_ACCOUNTHISTORY_TABLE, PaymentAccountHistorySchema, PaymentAccountHistory }
