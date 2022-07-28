const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const CustomerService = require('../services/customer.service')
const customerService = new CustomerService();
const sequelize = require('./../libs/sequelize');
const InventoryService = require('../services/inventory.service');
const { date } = require('joi');
const inventoryService = new InventoryService();

class OrderService {
  constructor() {
  }

  async create(data) {
    const response = await customerService.customerCanOrder(data.customerId);
    console.log('----------customer can order')
    console.log(response)
    if (!response) {
      throw "Has alcanzado el maximo de ordenes permitidas";
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

  async checkBalance(id) {
    const reducer = (accumalator, currentValue) => accumalator + (currentValue.productMove.cost * currentValue.productMove.quantity);
    const historyReducer = (accumalator, currentValue) => accumalator + (currentValue.paymentAccountHistory.amount);
    let order = await this.findOne(id);
    const payments = order.payments.reduce(historyReducer, 0);
    const due = order.items.reduce(reducer, 0);
    const diference = due - payments;
    if (diference < 0) {
      throw boom.badData('El pago no puede ser mayor al saldo');
    }
    if (payments == due) {
      this.update(id, { close: true });
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
    const rta = await models.Order.findAll({
      include: ['state', 'customer',
        {
          association: 'items',
          include: [
            {
              association: 'productMove',
              include: ['product', 'size']
            },
          ]
        }],
      where: {
        close: false,
        delivered: false
      }
    });
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
    console.log(rta)
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

      if (changes.delivered)
        await this.updateProductMoves(id);

      const order = await this.findOne(id);
      const rta = await order.update(changes);

      return rta;
  }

  async updateProductMoves(orderId) {

    const orderProducts = await models.OrderProduct.findAll({
      where: {
        orderId: orderId
      },
      include: ['productMove']
    })

    const productMoves = orderProducts.map(x => x.productMove);

    for (let productMove of productMoves) {
      productMove = await this.verifyIfProductIsInStock(productMove);
      console.log('-----pmo------------')
      console.log(productMove)
    }
    for (let productMove of productMoves) {
      const rta = await productMove.update({ delivered: true, cost: productMove.cost });
    }

  }

  async verifyIfProductIsInStock(productMove) {
    const lastDate = await inventoryService.getDateLastInventory();
    let productInventory = await inventoryService.getProductInventory(
      productMove.sizeId,
      productMove.productId
    );

    productInventory = await inventoryService.finishProductInventory(
      productInventory,
      lastDate,
      new Date(new Date())
    );

    if (productInventory.finalQuantity < productMove.quantity) {
      throw 'No hay suficientes articulos en bodega';
    }

    const cost = productInventory.initialQuantity > 0 ? productInventory.initialCost : productInventory.addedCost;
    const quantity = productInventory.initialQuantity > 0 ? productInventory.initialQuantity: productInventory.addedQuantity;
    console.log('---------------------')
    console.log(cost)
    console.log(quantity)
    productMove.cost = cost / quantity;
    console.log(productMove)
    return productMove;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
