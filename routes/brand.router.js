const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const BrandService = require('./../services/brand.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createBrandSchema, updateBrandSchema, getBrandSchema } = require('./../schemas/brand.schema');

const router = express.Router();
const service = new BrandService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'), async (req, res, next) => {
    try {
      const brands = await service.find();
      res.json(
        {
          error: false,
          content: brands
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
  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const brand = await service.findOne(id);
      res.json(
        {
          error: false,
          content: brand
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
  validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBrand = await service.create(body);
      res.json(
        {
          error: false,
          content: newBrand
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
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const brand = await service.update(id, body);
      res.json(
        {
          error: false,
          content: brand
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
  validatorHandler(getBrandSchema, 'params'),
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
