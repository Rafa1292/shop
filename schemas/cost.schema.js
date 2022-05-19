const Joi = require('joi');


const createCostSchema = Joi.object({
  description: Joi.string().required(),
  accountHistory: Joi.object({
    amount: Joi.number().required(),
    paymethodId: Joi.number().required(),
    debit: Joi.boolean().required(),

  }).required()
});


module.exports = { createCostSchema }
