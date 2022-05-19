const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class AccountService {

  constructor() {
  }
  async create(data) {
    const newAccount = await models.Account.create(data);
    return newAccount;
  }

  async find() {
    const rta = await models.Account.findAll();
    return rta;
  }

  async getBalance(paymethodId) {
    const paymethod = await models.Paymethod.findByPk(paymethodId);

    let rta = await models.AccountHistory.findAll({
      include: [{
        association: 'paymethod',
        where: {
          accountId : paymethod.accountId
        }
      }]
    });
    if(rta.length == 0){
      return 0;
    }

    let rtaSort = rta.sort((a,b) => b.createdAt - a.createdAt)
    return rtaSort[0].newBalance;
  }

  async findOne(id) {
    const account = await models.Account.findByPk(id);
    if (!account) {
      throw boom.notFound('user not found');
    }
    return account;
  }

  async update(id, changes) {
    const account = await this.findOne(id);
    const rta = account.update(changes);
    return rta;
  }

  async delete(id) {
    const account = await this.findOne(id);
    await account.destroy();
    return { id };
  }

}

module.exports = AccountService;
