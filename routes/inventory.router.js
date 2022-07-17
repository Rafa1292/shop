const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const InventoryService = require('./../services/inventory.service');


const router = express.Router();
const service = new InventoryService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const newInventory = await service.create();
      res.status(201).json(newInventory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
