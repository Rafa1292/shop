const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer().min(1);
const unitPrice = Joi.number();
const expiringDate = Joi.date();
const credit = Joi.bool();
const soldBy = Joi.string();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  expiringDate: expiringDate.required(),
  credit: credit.required(),
  soldBy: soldBy.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required(),
  unitPrice: unitPrice.required()
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema }
