const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CustomerService {
  constructor() { }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: [
        {
          association: 'orders',
          include: ['items']
        }
      ]
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






