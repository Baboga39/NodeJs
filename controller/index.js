// controllers/index.js
const authController = require('./authController');
const userController = require('./userController');
const tagController = require('./tagController');
const categoryController = require('./categoryController');
const blogController = require('./blogController');
module.exports = {
  authController,
  userController,
  tagController,
  categoryController,
  blogController,
};