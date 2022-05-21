const { Model, DataTypes, Sequelize } = require('sequelize');

const INVESTMENT_TABLE = 'investments';

const InvestmentSchema = {
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
  investBy: {
    field: 'invest_by',
    allowNull: false,
    type: DataTypes.INTEGER
  },
}

class Investment extends Model {
  static associate(models) {
    this.hasMany(models.InvestmentDetail, {
      as: 'details',
      foreignKey: 'investmentId'
    });
    this.hasMany(models.InvestmentAccountHistory, {
      as: 'histories',
      foreignKey: 'investmentId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVESTMENT_TABLE,
      modelName: 'Investment',
      timestamps: false
    }
  }
}

module.exports = { INVESTMENT_TABLE, InvestmentSchema, Investment }
