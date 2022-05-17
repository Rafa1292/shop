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
    res.json(subcategories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getSubcategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cubcategory = await service.findOne(id);
      res.json(cubcategory);
    } catch (error) {
      next(error);
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
      res.status(201).json(newSubcategory);
    } catch (error) {
      next(error);
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
      const cubcategory = await service.update(id, body);
      res.json(cubcategory);
    } catch (error) {
      next(error);
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
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
