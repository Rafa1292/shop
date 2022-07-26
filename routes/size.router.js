const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const SizeService = require('./../services/size.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSizeSchema, updateSizeSchema, getSizeSchema } = require('./../schemas/size.schema');

const router = express.Router();
const service = new SizeService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const sizes = await service.find();
      res.json({
        error: false,
        content: sizes
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
  validatorHandler(getSizeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const size = await service.findOne(id);
      res.json({
        error: false,
        content: size
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
  validatorHandler(createSizeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSize = await service.create(body);
      res.json({
        error: false,
        content: newSize
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
  validatorHandler(getSizeSchema, 'params'),
  validatorHandler(updateSizeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const size = await service.update(id, body);
      res.json({
        error: false,
        content: size
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
  validatorHandler(getSizeSchema, 'params'),
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
