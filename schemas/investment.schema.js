const Joi = require('joi');


const createInvestmentSchema = Joi.object({
    investBy: Joi.number().required(),
});


module.exports = { createInvestmentSchema }
