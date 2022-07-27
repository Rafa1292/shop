const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const EntryService = require('./../services/entry.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createEntrySchema } = require('./../schemas/entry.schema');

const router = express.Router();
const service = new EntryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const entries = await service.find();
      res.json({
        error: false,
        content: entries
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
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEntry = await service.create(body);
      res.json({
        error: false,
        content: newEntry
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
