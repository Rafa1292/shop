const { Model, DataTypes, Sequelize } = require('sequelize');
const { ACCOUNT_TABLE } = require('../models/account.model');

const PAYMETHOD_TABLE = 'paymethods';

const PaymethodSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  accountId: {
    field: 'account_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACCOUNT_TABLE,
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
}

class Paymethod extends Model {
  static associate(models) {
    this.belongsTo(models.Account, {as: 'account'});

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMETHOD_TABLE,
      modelName: 'Paymethod',
      timestamps: false
    }
  }
}

module.exports = { PAYMETHOD_TABLE, PaymethodSchema, Paymethod }
