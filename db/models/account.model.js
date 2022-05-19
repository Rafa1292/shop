const { Model, DataTypes, Sequelize } = require('sequelize');

const ACCOUNT_TABLE = 'accounts';

const AccountSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Account extends Model {
  static associate(models){
    this.hasMany(models.Paymethod, {
      as: 'paymethods',
      foreignKey: 'accountId'
    });
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: ACCOUNT_TABLE,
      modelName: 'Account',
      timestamps: false
    }
  }
}

module.exports = {ACCOUNT_TABLE, AccountSchema, Account}
