const { Model, DataTypes, Sequelize } = require('sequelize');
const { ACCOUNT_HISTORY_TABLE } = require('./account-history.model');


const COST_TABLE = 'costs';

const CostSchema = {
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
  accountHistoryId: {
    field: 'account_history_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references:{
      model: ACCOUNT_HISTORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

class Cost extends Model {
  static associate(models){
    this.belongsTo(models.AccountHistory, {as: 'accountHistory'});
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: COST_TABLE,
      modelName: 'Cost',
      timestamps: false
    }
  }
}

module.exports = {COST_TABLE, CostSchema, Cost}
