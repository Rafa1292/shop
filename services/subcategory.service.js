const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class SubcategoryService {

  constructor() {
  }
  async create(data) {
    const newSubcategory = await models.Subcategory.create(data);
    return newSubcategory;
  }

  async find() {
    const rta = await models.Subcategory.findAll();
    return rta;
  }

  async findOne(id) {
    const subcategory = await models.Subcategory.findByPk(id);
    if (!subcategory) {
      throw boom.notFound('subcategory not found');
    }
    return subcategory;
  }

  async update(id, changes) {
    const subcategory = await this.findOne(id);
    const rta = subcategory.update(changes);
    return rta;
  }

  async delete(id) {
    const subcategory = await this.findOne(id);
    await subcategory.destroy();
    return { id };
  }

}

module.exports = SubcategoryService;
