const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const SubcategoryService = require('./../services/subcategory.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSubcategorySchema, updateSubcategorySchema, getSubcategorySchema } = require('./../schemas/subcategory.schema');

const router = express.Router();
const service = new SubcategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const subcategories = await service.find();
      res.json({
        error: false,
        content: subcategories
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
  validatorHandler(getSubcategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const subcategory = await service.findOne(id);
      res.json({
        error: false,
        content: subcategory
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
  validatorHandler(createSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSubcategory = await service.create(body);
      res.json({
        error: false,
        content: newSubcategory
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
  validatorHandler(getSubcategorySchema, 'params'),
  validatorHandler(updateSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const subcategory = await service.update(id, body);
      res.json({
        error: false,
        content: subcategory
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
  validatorHandler(getSubcategorySchema, 'params'),
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
