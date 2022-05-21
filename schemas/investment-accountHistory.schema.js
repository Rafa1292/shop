const Joi = require('joi');
const { createAccountHistorySchema} = require('../schemas/account-history.schema')


const createInvestmentAccountHistorySchema = Joi.object({
  amount: Joi.number().required(),
  investmentId: Joi.number().required(),
  accountHistory: createAccountHistorySchema
});


module.exports = { createInvestmentAccountHistorySchema }
