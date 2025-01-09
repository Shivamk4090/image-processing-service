const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  AuthController.register
);

router.post('/login',
  [
    body('username').trim(),
    body('password').notEmpty()
  ],
  AuthController.login
);

module.exports = router;