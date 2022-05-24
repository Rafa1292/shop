const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const AccountService = require('../services/account.service')
const accountService = new AccountService();

class EntryService {

  constructor() {
  }
  async create(data) {
    console.log('service')
    const paymethodId = data.accountHistory.paymethodId;
    const previousBalance = await accountService.getBalance(paymethodId);
    const newEntry = await models.Entry.create({
      ...data,
      accountHistory: {
        ...data.accountHistory,
        previousBalance: previousBalance,
        newBalance : previousBalance + data.accountHistory.amount
      }
    },
      {
        include: ['accountHistory']
      });
    return newEntry;
  }

  async find() {
    const rta = await models.Entry.findAll({
      include: ['accountHistory']
    });
    return rta;
  }
}

module.exports = EntryService;
