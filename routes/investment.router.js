const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const InvestmentService = require('./../services/investment.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createInvestmentSchema } = require('./../schemas/investment.schema');

const router = express.Router();
const service = new InvestmentService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const investments = await service.find();
      res.json(investments);
    } catch (error) {
      next(error);
    }
  });


router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createInvestmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newInvestment = await service.create(body);
      res.status(201).json(newInvestment);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
