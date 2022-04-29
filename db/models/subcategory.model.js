const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const SUBCATEGORY_TABLE = 'subcategories';

const SubcategorySchema = {
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
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
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

class Subcategory extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'subcategoryId'
    });
    this.belongsTo(models.Category,
      { as: 'category' }
    );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBCATEGORY_TABLE,
      modelName: 'Subcategory',
      timestamps: false
    }
  }
}

module.exports = { SUBCATEGORY_TABLE, SubcategorySchema, Subcategory }
