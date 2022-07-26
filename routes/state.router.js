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
      res.json({
        error: false,
        content: states
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
  validatorHandler(getStateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const state = await service.findOne(id);
      res.json({
        error: false,
        content: state
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
  validatorHandler(createStateSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newState = await service.create(body);
      res.json({
        error: false,
        content: newState
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
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
      res.json({
        error: false,
        content: state
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
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
      res.json({
        error: false,
        content: id
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
