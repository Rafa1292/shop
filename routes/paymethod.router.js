const express = require('express');

const PaymethodService = require('./../services/paymethod.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPaymethodSchema, updatePaymethodSchema, getPaymethodSchema } = require('./../schemas/paymethod.schema');

const router = express.Router();
const service = new PaymethodService();

router.get('/', async (req, res, next) => {
  try {
    const paymethods = await service.find();
    res.json(paymethods);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPaymethodSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const paymethod = await service.findOne(id);
      res.json(paymethod);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPaymethodSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPaymethod = await service.create(body);
      res.status(201).json(newPaymethod);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPaymethodSchema, 'params'),
  validatorHandler(updatePaymethodSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const paymethod = await service.update(id, body);
      res.json(paymethod);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
