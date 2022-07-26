const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const ColorService = require('./../services/color.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createColorSchema, updateColorSchema, getColorSchema } = require('./../schemas/color.schema');

const router = express.Router();
const service = new ColorService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'), async (req, res, next) => {
    try {
      const colors = await service.find();
      res.json({
        error: false,
        content: colors
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getColorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const color = await service.findOne(id);
      res.json({
        error: false,
        content: color
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
  validatorHandler(createColorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newColor = await service.create(body);
      res.json({
        error: false,
        content: newColor
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
  validatorHandler(getColorSchema, 'params'),
  validatorHandler(updateColorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const color = await service.update(id, body);
      res.json({
        error: false,
        content: color
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
  validatorHandler(getColorSchema, 'params'),
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
