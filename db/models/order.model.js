const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  expiringDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'expiring_date'
  },
  credit: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  firstPay: {
    allowNull: true,
    field: 'first_pay',
    type: DataTypes.INTEGER
  },
  soldBy: {
    allowNull: false,
    field: 'sold_by',
    type: DataTypes.INTEGER
  },
  close: {
    type: DataTypes.BOOLEAN
  },
  delivered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  stateId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer,
      { as: 'customer' }
    );
    this.belongsTo(models.State,
      { as: 'state' }
    );
    this.hasMany(models.OrderProduct, {
      as: 'items',
      foreignKey: 'orderId'
    });
    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'orderId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order }
