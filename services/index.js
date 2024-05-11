const authService = require('./authService');
const userService = require('./UserService');
const tagService = require('./tagService');
const categoryService = require('./categoryService');
const blogService = require('./blogService');
const commentService = require('./commentService');
const notificationService = require('./notificationService');
const reportService = require('./reportService')
const chatService = require('./chatService')
const adminService= require('./adminService')
module.exports = {
  authService,
  userService,
  tagService,
  categoryService,
  blogService,
  commentService,
  notificationService,
  reportService,
  chatService,adminService
};