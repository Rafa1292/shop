const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() { }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create({
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOneWithOrders(id) {
    const customer = await models.Customer.findByPk(id, {
      include: [
        {
          association: 'orders',
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
              include: ['paymentAccountHistory']
            }
          ],
          where: {
            close: false
          }
        }
      ]
    });
    if (!customer) {
      throw boom.notFound('user not found');
    }
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['orders']
    });
    if (!customer) {
      throw boom.notFound('user not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }

  async customerCanOrder(customerId) {
    let response = false;
    const customer = await this.findOne(customerId);
    if (customer) {
      const openOrders = customer.orders.filter(order => !order.close);
      response = openOrders.length < customer.maxOrders;
    }
    return response;

  }
}

module.exports = CustomerService;






