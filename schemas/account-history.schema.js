const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer();
const paymethodId = Joi.number().integer();
const debit = Joi.boolean();

const createAccountHistorySchema = Joi.object({
  amount: amount.required(),
  paymethodId: paymethodId.required(),
  debit: debit.required()
});

const getAccountHistorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createAccountHistorySchema, getAccountHistorySchema }
