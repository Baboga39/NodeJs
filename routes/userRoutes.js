// routes/userRoutes.js
const express = require('express');
const auth = require('../middlewares/index')
const userController = require('../controller/userController');
const uploadCloud = require('../middlewares/uploadCloudinary');
const router = express.Router();

router.get('/info', userController.getUserInfo);
router.put('/removeAvatar',auth.authenticateToken,userController.removeAvatar)
router.patch('/resetPassword',auth.authenticateToken,userController.newPassword)
router.put('/changeAvatar',auth.authenticateToken,uploadCloud.single('imgage'),userController.updateAvatar)
router.patch('/changeInfo',auth.authenticateToken,userController.updatedUserInfo);
module.exports = router;