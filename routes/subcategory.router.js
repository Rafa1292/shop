const express = require('express');

const SubcategoryService = require('./../services/subcategory.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSubcategorySchema, updateSubcategorySchema, getSubcategorySchema } = require('./../schemas/subcategory.schema');

const router = express.Router();
const service = new SubcategoryService();

router.get('/', async (req, res, next) => {
  try {
    const subcategories = await service.find();
    res.json(subcategories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
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
