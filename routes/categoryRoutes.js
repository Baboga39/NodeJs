const express = require('express');
const controller = require('../controller');
const auth = require('../middlewares')
const uploadCloud = require('../middlewares/uploadCloudinary');

const router = express.Router();


router.get('/',controller.categoryController.getCategoryById);
router.get('/allCategories',controller.categoryController.getAllCategory);
router.get('/userCategories',auth.authenticateToken,controller.categoryController.getCategoryByUser)

router.post('/addCategory',auth.authenticateToken, controller.categoryController.addCategory);


router.delete('/:categoryId',auth.authenticateToken, controller.categoryController.deleteCategoryById);

router.patch('/removeTag',auth.authenticateToken, controller.categoryController.removeTags)
router.patch('/removeUser',auth.authenticateToken, controller.categoryController.removeUser)
router.patch('/edit',auth.authenticateToken, controller.categoryController.editCategory)


router.put('/addUser',auth.authenticateToken, controller.categoryController.addUsersToCategory)
router.put('/addTagToCategory',auth.authenticateToken, controller.categoryController.addTagsToCategory);
router.put('/changeAvatar/:categoryId',auth.authenticateToken,uploadCloud.single('image'), controller.categoryController.updateAvatar)
router.put('/changeBanner/:categoryId',auth.authenticateToken,uploadCloud.single('image'), controller.categoryController.updateAvatar)

module.exports = router;