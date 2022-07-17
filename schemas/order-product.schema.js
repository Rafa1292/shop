const Joi = require('joi');

const id = Joi.number().integer();
const quantity = Joi.number().integer();
const unitPrice = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const price = Joi.number().integer();

const createOrderProductSchema = Joi.object({
  quantity: quantity.required(),
  unitPrice: unitPrice.required(),
  orderId: orderId.required(),
  productId: productId.required(),
  price: price.required()
});

const updateOrderProductSchema = Joi.object({
  id: id.required(),
  quantity: quantity.required(),
  unitPrice: unitPrice.required(),
  orderId: orderId.required(),
  productId: productId.required()
});

const getOrderProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { updateOrderProductSchema, createOrderProductSchema, getOrderProductSchema }
