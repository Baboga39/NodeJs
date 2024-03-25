// routes/userRoutes.js
const express = require('express');
const auth = require('../middlewares/index')
const userController = require('../controller/userController');
const uploadCloud = require('../middlewares/uploadCloudinary');
const router = express.Router();

router.get('/', userController.getUserInfo);
router.get('/userFollower/:userId',auth.authenticateToken, userController.listUserFollower);
router.get('/userFollowing/:userId',auth.authenticateToken, userController.listUserFollowing);
router.get('/wallUser/:userId',auth.authenticateToken, userController.getWallUsers);



router.put('/removeAvatar',auth.authenticateToken,userController.removeAvatar)
router.put('/changeAvatar',auth.authenticateToken,uploadCloud.single('image'),userController.updateAvatar)

router.post('/likeBlog/:blogId',auth.authenticateToken,userController.likeBlog)
router.post('/saveBlog/:blogId',auth.authenticateToken,userController.saveBlog)
router.post('/comment',auth.authenticateToken,userController.addComment)
router.post('/follow/:userId',auth.authenticateToken,userController.followUser)


router.patch('/editComment',auth.authenticateToken,userController.editComment)

router.delete('/comment',auth.authenticateToken,userController.deleteComment)


router.patch('/changeInfo',auth.authenticateToken,userController.updatedUserInfo);
router.patch('/resetPassword',auth.authenticateToken,userController.newPassword)

module.exports = router;