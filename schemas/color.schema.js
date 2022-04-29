const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);

const createColorSchema = Joi.object({
  name: name.required(),
});

const updateColorSchema = Joi.object({
  name: name,
});

const getColorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createColorSchema, updateColorSchema, getColorSchema }
