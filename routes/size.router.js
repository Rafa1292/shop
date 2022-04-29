const express = require('express');

const SizeService = require('./../services/size.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSizeSchema, updateSizeSchema, getSizeSchema } = require('./../schemas/size.schema');

const router = express.Router();
const service = new SizeService();

router.get('/', async (req, res, next) => {
  try {
    const sizes = await service.find();
    res.json(sizes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getSizeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const size = await service.findOne(id);
      res.json(size);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSizeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSize = await service.create(body);
      res.status(201).json(newSize);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getSizeSchema, 'params'),
  validatorHandler(updateSizeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const size = await service.update(id, body);
      res.json(size);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSizeSchema, 'params'),
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
