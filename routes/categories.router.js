const express = require('express');
const passport = require('passport');
const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(
        {
          error: false,
          content: categories
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
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(
        {
          error: false,
          content: category
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer', 'admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.json(
        {
          error: false,
          content: newCategory
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(
        {
          error: false,
          content: category
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
  validatorHandler(getCategorySchema, 'params'),
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
      }    }
  }
);

module.exports = router;
