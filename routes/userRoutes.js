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
router.get('/listBlog/:userId',auth.authenticateToken, userController.listBlogByUserId);
router.get('/listFriend',auth.authenticateToken, userController.listFriends);
router.get('/report',auth.authenticateToken, userController.getAllReportTypes);

//Notify the user
router.get('/listNotify',auth.authenticateToken, userController.listNotifyByUser);
router.get('/listNotifyByType',auth.authenticateToken, userController.listNotifyByType);
router.post('/checkIsRead/:notifyId',auth.authenticateToken, userController.checkIsRead);

//Report the user
router.post('/reportUser',auth.authenticateToken, userController.reportUser);
router.post('/reportBlog',auth.authenticateToken, userController.reportBlog);
router.post('/reportTag',auth.authenticateToken, userController.reportTag);
router.post('/reportComment',auth.authenticateToken, userController.reportComment);
router.post('/shareBlog/:blogId',auth.authenticateToken, userController.shareBlog);


router.put('/removeAvatar',auth.authenticateToken,userController.removeAvatar)
router.put('/changeAvatar',auth.authenticateToken,uploadCloud.single('image'),userController.updateAvatar)

router.post('/likeBlog/:blogId',auth.authenticateToken,userController.likeBlog)
router.post('/saveBlog/:blogId',auth.authenticateToken,userController.saveBlog)
router.post('/comment',auth.authenticateToken,userController.addComment)
router.post('/follow/:userId',auth.authenticateToken,userController.followUser)
router.post('/deleteComment',auth.authenticateToken,userController.deleteComment)


router.patch('/editComment',auth.authenticateToken,userController.editComment)

router.post('/comment',auth.authenticateToken,userController.deleteComment)


router.patch('/changeInfo',auth.authenticateToken,userController.updatedUserInfo);
router.patch('/resetPassword',auth.authenticateToken,userController.newPassword)

module.exports = router;