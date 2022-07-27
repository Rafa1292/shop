const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const CostService = require('./../services/cost.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCostSchema } = require('./../schemas/cost.schema');

const router = express.Router();
const service = new CostService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const costs = await service.find();
      res.json({
        error: false,
        content: costs
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
  validatorHandler(createCostSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCost = await service.create(body);
      res.json({
        error: false,
        content: newCost
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
