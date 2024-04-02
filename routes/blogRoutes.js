const express = require('express');
const middleware = require('../middlewares/');
const controller = require('../controller')
const uploadCloud = require('../middlewares/uploadCloudinary');

const router = express.Router();


router.post('/create',middleware.authenticateToken,controller.blogController.createBlog);
router.post('/createDraft',middleware.authenticateToken,controller.blogController.createBlogDraft);
router.post('/uploadImage',middleware.authenticateToken ,uploadCloud.single('image'),controller.blogController.uploadImage);
router.put('/edit/:blogId',middleware.authenticateToken,controller.blogController.editBlog);


router.get('/getBlogById/:blogId',middleware.authenticateToken,controller.blogController.getBlogById);
router.get('/allBlog',middleware.authenticateToken,controller.blogController.getAllBlogByUserId);
router.get('/listBlogNew',middleware.authenticateToken,controller.blogController.listBlogNew);
router.get('/listBlogPopularity',middleware.authenticateToken,controller.blogController.listBlogPopularity);
router.get('/getAllByCategory',middleware.authenticateToken,controller.blogController.listBlogByCategory)
router.get('/sizeAllBlogByCategory/:categoryId',controller.blogController.sizeAllBlogByCategory)
router.get('/listBlogSaveByUser',middleware.authenticateToken,controller.blogController.listBlogSaveByUser)
router.get('/listBlogDraftByUser',middleware.authenticateToken,controller.blogController.listBlogDraftByUser)
router.get('/listBlogDiscussions',middleware.authenticateToken,controller.blogController.listBlogDiscussions)
router.get('/:index/listBlogInFeed',middleware.authenticateToken,controller.blogController.listBlogInFeed)


router.delete('/:blogId',middleware.authenticateToken,controller.blogController.deleteBlogById);

module.exports = router;