const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class StateService {

  constructor() {
  }

  async create(data) {
    const newState = await models.State.create(data);
    return newState;
  }

  async update(id, changes) {
    const state = await this.findOne(id);
    const rta = state.update(changes);
    return rta;
  }

  async find() {
    const rta = await models.State.findAll();
    return rta;
  }

  async findOne(id) {
    const state = await models.State.findByPk(id);
    if (!state) {
      throw boom.notFound('state not found');
    }
    return state;
  }
}

module.exports = StateService;
