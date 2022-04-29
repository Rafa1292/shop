const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);

const createStateSchema = Joi.object({
  name: name.required(),
});

const updateStateSchema = Joi.object({
  name: name,
});

const getStateSchema = Joi.object({
  id: id.required(),
});

module.exports = { createStateSchema, updateStateSchema, getStateSchema }
