const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const stateId = Joi.number().integer();

const createOrderStateSchema = Joi.object({
  orderId: orderId.required(),
  stateId: stateId.required()
});

const updateOrderStateSchema = Joi.object({
  id: id.required(),
  orderId: orderId.required(),
  stateId: stateId.required()
});

const getOrderStateSchema = Joi.object({
  id: id.required(),
});

module.exports = { updateOrderStateSchema, createOrderStateSchema, getOrderStateSchema }
