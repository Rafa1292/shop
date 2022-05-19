const { Model, DataTypes, Sequelize } = require('sequelize');
const { ACCOUNT_HISTORY_TABLE } = require('./account-history.model');


const ENTRY_TABLE = 'entries';

const EntrySchema = {
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
  }
}

class Entry extends Model {
  static associate(models){
    this.belongsTo(models.AccountHistory, {as: 'accountHistory'});
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: ENTRY_TABLE,
      modelName: 'Entry',
      timestamps: false
    }
  }
}

module.exports = {ENTRY_TABLE, EntrySchema, Entry}
