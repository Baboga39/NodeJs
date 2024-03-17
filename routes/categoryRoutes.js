const express = require('express');
const controller = require('../controller');
const auth = require('../middlewares')
const uploadCloud = require('../middlewares/uploadCloudinary');

const router = express.Router();


router.get('/',controller.categoryController.getCategoryById);
router.get('/allCategories',auth.authenticateToken,controller.categoryController.getAllCategory);
router.get('/userCategories',auth.authenticateToken,controller.categoryController.getCategoryByUser)
router.get('/categoryByInvitationCode/:invitationCode',auth.authenticateToken,controller.categoryController.checkInvitationCode)
router.get('/userRequest/:categoryId',auth.authenticateToken,controller.categoryController.listUserRequest)

router.post('/addCategory',auth.authenticateToken, controller.categoryController.addCategory);
router.post('/requestJoin/:categoryId',auth.authenticateToken, controller.categoryController.sendRequestJoinCategory);
router.post('/evaluateRequest',auth.authenticateToken, controller.categoryController.evaluateRequest);


router.delete('/:categoryId',auth.authenticateToken, controller.categoryController.deleteCategoryById);

router.patch('/removeTag',auth.authenticateToken, controller.categoryController.removeTags)
router.patch('/removeUser',auth.authenticateToken, controller.categoryController.removeUser)
router.patch('/edit',auth.authenticateToken, controller.categoryController.editCategory)


router.put('/addUser',auth.authenticateToken, controller.categoryController.addUsersToCategory)
router.put('/addTagToCategory',auth.authenticateToken, controller.categoryController.addTagsToCategory);
router.put('/joinCategory/:categoryId',auth.authenticateToken, controller.categoryController.joinCategoryByUser);
router.put('/leaveCategory/:categoryId',auth.authenticateToken, controller.categoryController.leaveCategory);
router.put('/changeAvatar/:categoryId',auth.authenticateToken,uploadCloud.single('image'), controller.categoryController.updateAvatar)
router.put('/changeBanner/:categoryId',auth.authenticateToken,uploadCloud.single('image'), controller.categoryController.updateAvatar)

module.exports = router;