const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const StateService = require('./../services/state.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createStateSchema, updateStateSchema, getStateSchema } = require('./../schemas/state.schema');

const router = express.Router();
const service = new StateService();

router.get('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
 async (req, res, next) => {
  try {
    const states = await service.find();
    res.json(states);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getStateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const state = await service.findOne(id);
      res.json(state);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(createStateSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newState = await service.create(body);
      res.status(201).json(newState);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getStateSchema, 'params'),
  validatorHandler(updateStateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const state = await service.update(id, body);
      res.json(state);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getStateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
