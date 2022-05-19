const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const AccountService = require('../services/account.service')
const accountService = new AccountService();

class CostService {

  constructor() {
  }

  async create(data) {
    const paymethodId = data.accountHistory.paymethodId;
    const previousBalance = await accountService.getBalance(paymethodId);
    const newCost = await models.Cost.create({
      ...data,
      accountHistory: {
        ...data.accountHistory,
        previousBalance: previousBalance,
        newBalance : previousBalance - data.accountHistory.amount
      }
    },
      {
        include: ['accountHistory']
      });
    return newCost;
  }

  async find() {
    const rta = await models.Cost.findAll({
      include: ['accountHistory']
    });
    return rta;
  }
}

module.exports = CostService;
