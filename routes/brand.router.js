const express = require('express');

const BrandService = require('./../services/brand.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createBrandSchema, updateBrandSchema, getBrandSchema } = require('./../schemas/brand.schema');

const router = express.Router();
const service = new BrandService();

router.get('/', async (req, res, next) => {
  try {
    const brands = await service.find();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const brand = await service.findOne(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBrand = await service.create(body);
      res.status(201).json(newBrand);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const brand = await service.update(id, body);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getBrandSchema, 'params'),
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
