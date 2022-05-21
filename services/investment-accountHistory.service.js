const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const AccountService = require('../services/account.service')
const accountService = new AccountService();

class InvestmentAccountHistoryService {

  constructor() {
  }
  async create(data) {
    const previousBalance = await accountService.getBalance(data.accountHistory.paymethodId);
    const newInvestmentHistory = await models.InvestmentAccountHistory.create({
      ...data,
      accountHistory:{
        ...data.accountHistory,
        previousBalance: previousBalance,
        newBalance: previousBalance - data.amount
      }
    },{
      include: ['accountHistory']
    });
    return newInvestmentHistory;
  }

}

module.exports = InvestmentAccountHistoryService;
