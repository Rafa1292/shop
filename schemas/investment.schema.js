const Joi = require('joi');


const createInvestmentSchema = Joi.object({
  investBy: Joi.number().required(),
  details: Joi.array().items(Joi.object({
    productMove: Joi.object().required({
      quantity: Joi.number().integer().required(),
      unitPrice: Joi.number().integer().required(),
      productId: Joi.number().integer().required(),
      investmentId: Joi.number().integer().required(),
      sizeId: Joi.number().integer().required(),
      exit: Joi.boolean().required(),
      cost: Joi.number().integer().required()
    })
  }))
});


module.exports = { createInvestmentSchema }
