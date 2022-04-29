const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { STATE_TABLE } = require('./state.model');

const ORDER_STATE_TABLE = 'orders_states';

const OrderStateSchema = {
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
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  stateId: {
    field: 'state_id',
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STATE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  }
}

class OrderState extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_STATE_TABLE,
      modelName: 'OrderState',
      timestamps: false
    }
  }
}

module.exports = { ORDER_STATE_TABLE, OrderStateSchema, OrderState }
