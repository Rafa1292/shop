const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const categoryId = Joi.number().integer();

const createSubcategorySchema = Joi.object({
  name: name.required(),
  categoryId: categoryId.required()
});

const updateSubcategorySchema = Joi.object({
  name: name,
  categoryId: categoryId
});

const getSubcategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createSubcategorySchema, updateSubcategorySchema, getSubcategorySchema }
