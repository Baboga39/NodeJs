const express = require('express');
const UserController = require('../controller/authController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/register', UserController.register) ;
router.post('/registerAdmin',middleware.authenticateToken,middleware.filter('Admin'),UserController.registerAdmin)
router.post('/verify', UserController.verify);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);

module.exports = router;
