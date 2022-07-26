const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config')
const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        error: false,
        content: {
          user,
          token
        }
      });
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }
);

router.get("/login/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: 'succesfull',
    user: req.user
  })
});

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

router.get('/google',
  passport.authenticate('google', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:8080/login' }),
  function (req, res) {
    res.cookie('token', req.user)
    res.redirect('http://localhost:8080/')
  });


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:8080/login', session: false }),
  function (req, res) {
    console.log(req.user)
    res.cookie('token', req.user)
    res.redirect('http://localhost:8080/')
  });

module.exports = router;
