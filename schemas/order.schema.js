const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer().min(1);
const unitPrice = Joi.number();
const expiringDate = Joi.date();
const credit = Joi.bool();
const close = Joi.bool();
const firstPay = Joi.number().integer();
const delivered = Joi.bool();
const soldBy = Joi.string();

const createOrderSchema = Joi.object({
  pictureToSee,
  customerId: customerId.required(),
  expiringDate: expiringDate.required(),
  credit: credit.required(),
  soldBy: soldBy.required(),
  close: close.required(),
  firstPay: firstPay.required(),
  delivered: delivered.required(),
  stateId:  Joi.number().integer().required(),
  items: Joi.array().items(Joi.object({
    price: Joi.number().integer().required(),
    productMove: Joi.object().required({
      quantity: Joi.number().integer().required(),
      unitPrice: Joi.number().integer().required(),
      productId: Joi.number().integer().required(),
      investmentId: Joi.number().integer().required(),
      sizeId: Joi.number().integer().required(),
      exit: Joi.boolean().required(),
      delivered: Joi.bool().required(),
      cost: Joi.number().integer().required(),
    })
    }))
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required(),
  unitPrice: unitPrice.required()
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema }
