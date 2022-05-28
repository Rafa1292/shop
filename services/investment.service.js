const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class InvestmentService {

  constructor() {
  }
  async create(data) {
    for (let index = 0; index < data.details.length; index++) {
      const productMove = await models.ProductMove.create(
        data.details[index].productMove
      )
      data.details[index].productMoveId = productMove.id;
    }
    const newInvestment = await models.Investment.create(data, {
      include: [
        'details',
        'histories']
    });
    return newInvestment;
  }

  async find() {
    const rta = await models.Investment.findAll({
      include: [{
        association: 'details',
        include: [{
          association: 'productMove',
          include: ['product']
        }]
      }, {
        association: 'histories',
        include: ['accountHistory']
      }]
    });
    return rta;
  }

  async findOne(id) {
    const investment = await models.Investment.findByPk(id, {
      include: [{
        association: 'details',
        include: 'productMove'
      }, {
        association: 'histories',
        include: ['accountHistory']
      }]
    });
    if (!investment) {
      throw boom.notFound('user not found');
    }
    return investment;
  }
}

module.exports = InvestmentService;
