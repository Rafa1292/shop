const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const CustomerService = require('../services/customer.service')
const customerService = new CustomerService();

class OrderService {

  constructor() {
  }
  async create(data) {
    const response = await customerService.customerCanOrder(data.customerId);
    if (!response) {
      throw boom.conflict("Has alcanzado el maximo de ordenes abiertas");
    }
    for (let index = 0; index < data.items.length; index++) {
      const productMove = await models.ProductMove.create(
        data.items[index].productMove
      )
      data.items[index].productMoveId = productMove.id;
    }
    const newOrder = await models.Order.create(data, {
      include: ['items']
    });
    return newOrder;
  }

  async checkBalance (id){
    const reducer = (accumalator, currentValue) => accumalator + (currentValue.productMove.cost * currentValue.productMove.quantity);
    const historyReducer = (accumalator, currentValue) => accumalator + (currentValue.paymentAccountHistory.amount);
    let order = await this.findOne(id);
    const payments = order.payments.reduce(historyReducer, 0);
    const due = order.items.reduce(reducer, 0);
    const diference = due - payments;
    if(diference < 0){
      throw boom.badData('El pago no puede ser mayor al saldo');
    }
    if(payments == due){
      this.update(id, {close: true});
    }
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async addPayment(data) {
    const addPayment = await models.Payment.create(data);
    return addPayment;
  }

  async find() {
    const rta = await models.Order.findAll();
    return rta;
  }

  async findByCustomer(customerId) {
    const rta = await models.Order.findAll({
      include: [
        {
          association: 'items',
          include: [{
            association: 'productMove',
            include: 'product'
          }
          ]
        },
        {
          association: 'payments',
          include: [
            {
              association: 'paymentAccountHistory',
              include: [{
                association: 'accountHistory',
                include: [{
                  association: 'paymethod'
                }]
              }]
            }
          ]
        },
      ],
      where: {
        customerId: customerId
      }
    });
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'items',
          include: [{
            association: 'productMove',
            include: 'product'
          }
          ]
        },
        {
          association: 'payments',
          include: [
            {
              association: 'paymentAccountHistory',
              include: [{
                association: 'accountHistory',
                include: [{
                  association: 'paymethod'
                }]
              }]
            }
          ]
        },
      ],
    });
    if (!order) {
      throw boom.notFound('user not found');
    }

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
