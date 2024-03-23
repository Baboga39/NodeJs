// routes/userRoutes.js
const express = require('express');
const auth = require('../middlewares/index')
const userController = require('../controller/userController');
const uploadCloud = require('../middlewares/uploadCloudinary');
const router = express.Router();

router.get('/', userController.getUserInfo);



router.put('/removeAvatar',auth.authenticateToken,userController.removeAvatar)
router.put('/changeAvatar',auth.authenticateToken,uploadCloud.single('image'),userController.updateAvatar)

router.post('/likeBlog/:blogId',auth.authenticateToken,userController.likeBlog)
router.post('/saveBlog/:blogId',auth.authenticateToken,userController.saveBlog)
router.post('/comment',auth.authenticateToken,userController.addComment)

router.delete('/comment',auth.authenticateToken,userController.deleteComment)


router.patch('/changeInfo',auth.authenticateToken,userController.updatedUserInfo);
router.patch('/resetPassword',auth.authenticateToken,userController.newPassword)

module.exports = router;