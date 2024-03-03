// routes/userRoutes.js
const express = require('express');
const userController = require('../controller/index').userController;
const router = express.Router();

router.get('/info', userController.getUserInfo);

module.exports = router;