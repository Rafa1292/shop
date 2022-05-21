const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const InvestmentAccountHistoryService = require('./../services/investment-accountHistory.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createInvestmentAccountHistorySchema } = require('./../schemas/investment-accountHistory.schema');

const router = express.Router();
const service = new InvestmentAccountHistoryService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createInvestmentAccountHistorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newInvestmentAccountHistory = await service.create(body);
      res.status(201).json(newInvestmentAccountHistory);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
