const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const accountId = Joi.number().integer();

const createPaymethodSchema = Joi.object({
  name: name.required(),
  accountId: accountId.required()
});

const updatePaymethodSchema = Joi.object({
  name: name,
  accountId: accountId
});

const getPaymethodSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPaymethodSchema, updatePaymethodSchema, getPaymethodSchema }
