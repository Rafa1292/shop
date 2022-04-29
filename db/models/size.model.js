const { Model, DataTypes, Sequelize } = require('sequelize');

const SIZE_TABLE = 'sizes';

const SizeSchema = {
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

class Size extends Model {
  static associate(models){
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: SIZE_TABLE,
      modelName: 'Size',
      timestamps: false
    }
  }
}

module.exports = {SIZE_TABLE, SizeSchema, Size}
