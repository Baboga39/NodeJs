const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controller')
const router = express.Router();

router.post('/addSettingBlog',middleware.authenticateToken,controller.adminController.addSettingsBlog)
router.post('/deleteSettingBlog',middleware.authenticateToken,controller.adminController.deleteSettingBlog)
router.patch('/editSettingBlog',middleware.authenticateToken,controller.adminController.editSettingsBlog)
router.post('/addTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.addTypeReport)
router.post('/deleteTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteTypeReport)
router.patch('/editTypeReport',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.editTypeReport)


router.get('/:type/listReport',middleware.authenticateToken,controller.adminController.getListReportByType)
router.get('/allBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getALlBlog)
router.get('/allBlogSetting',middleware.authenticateToken,controller.adminController.getAllBlogSettings)
router.get('/allTag',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllTag)
router.get('/allCategory',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllCategory)
router.get('/allUser',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllUser)
router.get('/allUserBlocked',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.getAllUserBlocked)


//Chart
router.get('/:month/chartAccess',middleware.authenticateToken,controller.adminController.access)
router.get('/generalBlog',middleware.authenticateToken,controller.adminController.generalBlog)
router.get('/generalTag',middleware.authenticateToken,controller.adminController.generalTag)
router.get('/generalCategory',middleware.authenticateToken,controller.adminController.generalCategory)
router.get('/generalUser',middleware.authenticateToken,controller.adminController.generalUser)
router.get('/blogInChartWeek',middleware.authenticateToken,controller.adminController.blogInChartWeek)
router.get('/blogInChartMonth',middleware.authenticateToken,controller.adminController.blogInChartMonth)
router.get('/blogInChartYear',middleware.authenticateToken,controller.adminController.blogInChartYear)




router.post('/evaluateReport',middleware.authenticateToken,controller.adminController.evaluateReport)
router.post('/openAccount',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.openAccount)
router.post('/decentralization',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.decentralization)
router.post('/blockedUser',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.blockedUser)



router.delete('/:blogId/deleteBlog',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteBlogById)
router.delete('/:tagId/deleteTag',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteTags)
router.delete('/:categoryId/deleteCategory',middleware.authenticateToken,middleware.filter('Admin'),controller.adminController.deleteCategory)


module.exports = router;
