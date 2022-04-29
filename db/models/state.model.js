const { Model, DataTypes, Sequelize } = require('sequelize');

const STATE_TABLE = 'states';

const StateSchema = {
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class State extends Model {
  static associate(models){
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: STATE_TABLE,
      modelName: 'State',
      timestamps: false
    }
  }
}

module.exports = {STATE_TABLE, StateSchema, State}
