const Joi = require('joi');
const { createPaymentAccountHistorySchema} = require('../schemas/payment-accountHistory.schema')

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const amount = Joi.number().integer();

const createPaymentSchema = Joi.object({
  orderId: orderId.required(),
  PaymentAccountHistory: createPaymentAccountHistorySchema,
  // accountHistories: Joi.array().items(Joi.object({
  //   amount: amount.required(),
  //   paymethodId : Joi.number().integer().required(),
  //   debit : Joi.bool().required(),
  //   }))
});

const getPaymentSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPaymentSchema, getPaymentSchema }
