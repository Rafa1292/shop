const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class PaymentService {

  constructor() {
  }
  async create(data) {
    const newPayment = await models.Payment.create(data, {
      include: ['accountHistories']
    });
    return newPayment;
  }

  async find() {
    const rta = await models.Payment.findAll();
    return rta;
  }

  async findOne(id) {
    const payment = await models.Payment.findByPk(id, {
      include: [
        'accountHistories',
      ]
    });
    if (!payment) {
      throw boom.notFound('brand not found');
    }
    return payment;
  }
}

module.exports = PaymentService;
