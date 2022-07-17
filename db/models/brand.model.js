const { Model, DataTypes, Sequelize } = require('sequelize');

const BRAND_TABLE = 'brands';

const BrandSchema = {
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
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
}

class Brand extends Model {
  static associate(models){}

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: BRAND_TABLE,
      modelName: 'Brand',
      timestamps: false
    }
  }
}

module.exports = {BRAND_TABLE, BrandSchema, Brand}
