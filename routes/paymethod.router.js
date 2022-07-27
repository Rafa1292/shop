const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PaymethodService = require('./../services/paymethod.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPaymethodSchema, updatePaymethodSchema, getPaymethodSchema } = require('./../schemas/paymethod.schema');

const router = express.Router();
const service = new PaymethodService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'), async (req, res, next) => {
    try {
      const paymethods = await service.find();
      res.json({
        error: false,
        content: paymethods
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getPaymethodSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const paymethod = await service.findOne(id);
      res.json({
        error: false,
        content: paymethod
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createPaymethodSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPaymethod = await service.create(body);
      res.json({
        error: false,
        content: newPaymethod
      });
    } catch (error) {
      res.json( {
        error: true,
        message: error
      })
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getPaymethodSchema, 'params'),
  validatorHandler(updatePaymethodSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const paymethod = await service.update(id, body);
      res.json({
        error: false,
        content: paymethod
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

module.exports = router;
