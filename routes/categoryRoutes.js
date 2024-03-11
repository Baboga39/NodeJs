const express = require('express');
const controller = require('../controller');
const auth = require('../middlewares')

const router = express.Router();


router.get('/',controller.categoryController.getCategoryById);
router.get('/allCategories',controller.categoryController.getAllCategory);

router.post('/addCategory',auth.authenticateToken, controller.categoryController.addCategory);


router.delete('/:categoryId',auth.authenticateToken, controller.categoryController.deleteCategoryById);

router.patch('/removeTag',auth.authenticateToken, controller.categoryController.removeTags)
router.patch('/removeUser',auth.authenticateToken, controller.categoryController.removeUser)


router.put('/addUser',auth.authenticateToken, controller.categoryController.addUsersToCategory)
router.put('/addTagToCategory',auth.authenticateToken, controller.categoryController.addTagsToCategory);

module.exports = router;