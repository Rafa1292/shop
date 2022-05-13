const Joi = require('joi');
const { createAccountHistorySchema} = require('../schemas/account-history.schema')

const id = Joi.number().integer();
const amount = Joi.number().integer();
const paymentId = Joi.number().integer();
const accountHistoryId = Joi.number().integer();

const createPaymentAccountHistorySchema = Joi.object({
  amount: amount.required(),
  accountHistory: createAccountHistorySchema
});

const updateAccountHistorySchema = Joi.object({
  id: id.required(),
  amount: amount.required(),
  paymentId: paymentId.required(),
  accountHistoryId: accountHistoryId.required()
});

const getAccountHistorySchema = Joi.object({
  id: id.required(),
});

module.exports = { updateAccountHistorySchema, createPaymentAccountHistorySchema, getAccountHistorySchema }
