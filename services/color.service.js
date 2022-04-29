const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ColorService {

  constructor() {
  }
  async create(data) {
    const newColor = await models.Color.create(data);
    return newColor;
  }

  async find() {
    const rta = await models.Color.findAll();
    return rta;
  }

  async findOne(id) {
    const color = await models.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('color not found');
    }
    return color;
  }

  async update(id, changes) {
    const color = await this.findOne(id);
    const rta = color.update(changes);
    return rta;
  }

  async delete(id) {
    const color = await this.findOne(id);
    await color.destroy();
    return { id };
  }

}

module.exports = ColorService;
