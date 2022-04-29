const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);

const createAccountSchema = Joi.object({
  name: name.required(),
});

const updateAccountSchema = Joi.object({
  name: name,
});

const getAccountSchema = Joi.object({
  id: id.required(),
});

module.exports = { createAccountSchema, updateAccountSchema, getAccountSchema }
