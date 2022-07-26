const express = require('express');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/',
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json({
        error: false,
        content: orders
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
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json({
        error: false,
        content: order
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

router.get('/customer/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findByCustomer(id);
      res.json({
        error: false,
        content: order
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
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.json({
        error: false,
        content: newOrder
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
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json({
        error: false,
        content: order
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.json({
        error: false,
        content: order
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
