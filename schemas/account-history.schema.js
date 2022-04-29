const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer();
const paymethodId = Joi.number().integer();

const createAccountHistorySchema = Joi.object({
  amount: amount.required(),
  paymethodId: paymethodId.required()
});

const getAccountHistorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createAccountHistorySchema, getAccountHistorySchema }
