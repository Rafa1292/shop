const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class BrandService {

  constructor() {
  }
  async create(data) {
    const newBrand = await models.Brand.create(data);
    return newBrand;
  }

  async find() {
    const rta = await models.Brand.findAll();
    return rta;
  }

  async findOne(id) {
    const brand = await models.Brand.findByPk(id);
    if (!brand) {
      throw boom.notFound('brand not found');
    }
    return brand;
  }

  async update(id, changes) {
    const brand = await this.findOne(id);
    const rta = brand.update(changes);
    return rta;
  }

  async delete(id) {
    const brand = await this.findOne(id);
    await brand.destroy();
    return { id };
  }

}

module.exports = BrandService;
