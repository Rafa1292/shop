const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PaymentService = require('./../services/payment.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getPaymentSchema, createPaymentSchema } = require('./../schemas/payment.schema');

const router = express.Router();
const service = new PaymentService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'), async (req, res, next) => {
    try {
      const payments = await service.find();
      res.json({
        error: false,
        content: payments
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await service.findOne(id);
      res.json({
        error: false,
        content: payment
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayment = await service.create(body);
      res.json({
        error: false,
        content: newPayment
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

module.exports = router;
