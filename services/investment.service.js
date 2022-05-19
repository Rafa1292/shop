const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class InvestmentService {

  constructor() {
  }
  async create(data) {
    const newInvestment = await models.Investment.create(data);
    return newInvestment;
  }

  async find() {
    const rta = await models.Investment.findAll();
    return rta;
  }
}

module.exports = InvestmentService;
