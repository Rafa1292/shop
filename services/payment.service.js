const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');
const { models } = require('./../libs/sequelize');
const OrderService = require('../services/order.service')
const AccountService = require('../services/account.service')

const orderService = new OrderService();
const accountService = new AccountService();

class PaymentService {

  constructor() {
  }
  async create(data) {

    const amount = data.paymentAccountHistory.accountHistory.amount;
    const paymethodId = data.paymentAccountHistory.accountHistory.paymethodId;
    try {
      const previousBalance = await accountService.getBalance(paymethodId);
      const accountHistory = await models.AccountHistory.create({
				paymethodId: data.paymentAccountHistory.accountHistory.paymethodId,
				amount: amount,
				debit: false,
        previousBalance: previousBalance,
        newBalance: previousBalance + amount
			});
      const payment = await models.Payment.create(data);
      const paymentAccountHistory = await models.PaymentAccountHistory.create({
        paymentId: payment.id,
        accountHistoryId: accountHistory.id,
        amount: amount
      });
      await orderService.checkBalance(data.orderId);
      return payment;
    } catch (error) {
      return error;
    }
  }

  async find() {
    const rta = await models.Payment.findAll();
    return rta;
  }

  async findOne(id) {
    const payment = await models.Payment.findByPk(id, {
      include: [
        'paymentAccountHistory',
      ]
    });
    if (!payment) {
      throw boom.notFound('brand not found');
    }
    return payment;
  }
}

module.exports = PaymentService;
