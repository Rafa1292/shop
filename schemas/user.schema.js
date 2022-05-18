const Joi = require('joi');
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  customer: Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    maxOrders: Joi.number().required()
  }).required()
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
