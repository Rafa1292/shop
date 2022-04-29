const express = require('express');

const AccountService = require('./../services/account.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createAccountSchema, updateAccountSchema, getAccountSchema } = require('./../schemas/account.schema');

const router = express.Router();
const service = new AccountService();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await service.find();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getAccountSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const account = await service.findOne(id);
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createAccountSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAccount = await service.create(body);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getAccountSchema, 'params'),
  validatorHandler(updateAccountSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const account = await service.update(id, body);
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
