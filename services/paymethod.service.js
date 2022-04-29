const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class PaymethodService {

  constructor() {
  }
  async create(data) {
    const newPaymethod = await models.Paymethod.create(data);
    return newPaymethod;
  }

  async find() {
    const rta = await models.Paymethod.findAll();
    return rta;
  }

  async findOne(id) {
    const paymethod = await models.Paymethod.findByPk(id);
    if (!paymethod) {
      throw boom.notFound('paymethod not found');
    }
    return paymethod;
  }

  async update(id, changes) {
    const paymethod = await this.findOne(id);
    const rta = paymethod.update(changes);
    return rta;
  }
}

module.exports = PaymethodService;
