const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2).max(2);

const createSizeSchema = Joi.object({
  name: name.required(),
});

const updateSizeSchema = Joi.object({
  name: name,
});

const getSizeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSizeSchema, updateSizeSchema, getSizeSchema }
