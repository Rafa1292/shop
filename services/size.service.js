const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class SizeService {

  constructor() {
  }
  async create(data) {
    const newSize = await models.Size.create(data);
    return newSize;
  }

  async find() {
    const rta = await models.Size.findAll();
    return rta;
  }

  async findOne(id) {
    const size = await models.Size.findByPk(id);
    if (!size) {
      throw boom.notFound('size not found');
    }
    return size;
  }

  async update(id, changes) {
    const size = await this.findOne(id);
    const rta = size.update(changes);
    return rta;
  }

  async delete(id) {
    const size = await this.findOne(id);
    await size.destroy();
    return { id };
  }

}

module.exports = SizeService;
