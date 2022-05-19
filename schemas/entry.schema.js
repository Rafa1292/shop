const Joi = require('joi');


const createEntrySchema = Joi.object({
  accountHistory: Joi.object({
    amount: Joi.number().required(),
    paymethodId: Joi.number().required(),
    debit: Joi.boolean().required(),

  }).required()
});


module.exports = { createEntrySchema }
