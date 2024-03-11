const express = require('express');
const middleware = require('../middlewares/');
const controller = require('../controller')
const uploadCloud = require('../middlewares/uploadCloudinary');

const router = express.Router();


router.post('/create',middleware.authenticateToken,controller.blogController.createBlog);
router.post('/createDraft',middleware.authenticateToken,controller.blogController.createBlogDraft);
router.post('/uploadImage',middleware.authenticateToken ,uploadCloud.single('image'),controller.blogController.uploadImage);
router.post('/uploadAvatar',middleware.authenticateToken ,uploadCloud.single('image'),controller.blogController.uploadAvatar);

router.put('/edit/:blogId',middleware.authenticateToken,controller.blogController.editBlog);


router.get('/getBlogById/:blogId',middleware.authenticateToken,controller.blogController.getBlogById);
router.get('/allBlog',middleware.authenticateToken,controller.blogController.getAllBlogByUserId);

router.delete('/:blogId',controller.blogController.deleteBlogById);

module.exports = router;