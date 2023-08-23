const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const limiter = require('../middleware/ratelimiter')

router.post('/signup', limiter, userController.signup);
router.post('/login', limiter, userController.login);

module.exports = router;
