const express = require('express');

const PaymentService = require('./../services/payment.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getPaymentSchema, createPaymentSchema } = require('./../schemas/payment.schema');

const router = express.Router();
const service = new PaymentService();

router.get('/', async (req, res, next) => {
  try {
    const payments = await service.find();
    res.json(payments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await service.findOne(id);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayment = await service.create(body);
      res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
