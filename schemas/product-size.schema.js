const Joi = require('joi');

const id = Joi.number().integer();
const sizeId = Joi.number().integer();

const createProductSizeSchema = Joi.object({
  sizeId: sizeId.required(),
});

const updateProductSizeSchema = Joi.object({
  id: id.required(),
  sizeId: sizeId.required(),
});

const getProductSizeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSizeSchema, updateProductSizeSchema, getProductSizeSchema }
