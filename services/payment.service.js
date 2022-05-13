const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');
const { models } = require('./../libs/sequelize');
const OrderService = require('../services/order.service')
const orderService = new OrderService();
class PaymentService {

  constructor() {
  }
  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const accountHistory = await models.AccountHistory.create(data.PaymentAccountHistory.accountHistory);
      const payment = await models.Payment.create(data);
      const paymentAccountHistory = await models.PaymentAccountHistory.create({
        "paymentId": payment.id,
        "accountHistoryId": accountHistory.id,
        "amount": data.PaymentAccountHistory.amount
      });
      await orderService.checkBalance(data.orderId);
      await transaction.commit();
      return payment;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
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
