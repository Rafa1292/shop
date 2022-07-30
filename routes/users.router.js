const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'), async (req, res, next) => {
    try {
      const users = await service.find();
      res.json({
        error: false,
        content: users
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.get('/get-role',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await service.findOne(req.user.sub);
      res.json({
        error: false,
        content: {
          role: user.role,
          sub: user.id,
          user: user.email,
          customerId: user.customer ? user.customer.id : 0,
          phone: user?.customer?.phone ? user?.customer?.phone : 0
        }
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json({
        error: false,
        content: user
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json({
        error: false,
        content: newUser
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json({
        error: false,
        content: user
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({
        error: false,
        content: id
      });
    } catch (error) {
      res.json({
        error: true,
        message: error
      })
    }
  }
);

module.exports = router;

