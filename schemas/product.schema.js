const Joi = require('joi');

const id = Joi.number().integer();
const brandId = Joi.number().integer();
const primaryColorId = Joi.number().integer();
const secondaryColorId = Joi.number().integer();
const subcategoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(3).max(15);
const price = Joi.number().integer();
const image = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  brandId: brandId.required(),
  primaryColorId: primaryColorId.required(),
  secondaryColorId: secondaryColorId.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  subcategoryId: subcategoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  image: image,
  subcategoryId: subcategoryId,
  brandId: brandId,
  primaryColorId: primaryColorId,
  secondaryColorId: secondaryColorId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price_min,
  price_max,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
