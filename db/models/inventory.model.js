const { Model, DataTypes, Sequelize } = require('sequelize');

const INVENTORY_TABLE = 'inventories';

const InventorySchema = {
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
  from: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  to: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  initialValue: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  finalValue: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}

class Inventory extends Model {
  static associate(models){
    this.hasMany(models.ProductInventory, {
      as: 'products',
      foreignKey: 'inventoryId'
    });
  }

  static config(sequelize)
  {
    return{
      sequelize,
      tableName: INVENTORY_TABLE,
      modelName: 'Inventory',
      timestamps: false
    }
  }
}

module.exports = {INVENTORY_TABLE, InventorySchema, Inventory}
