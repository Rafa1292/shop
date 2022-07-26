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
      res.json({
        error: false,
        content: newInventory
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
