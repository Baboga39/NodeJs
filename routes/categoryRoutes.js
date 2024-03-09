const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.get('/',controller.categoryController.getCategoryById);
router.get('/allCategories',controller.categoryController.getAllCategory);

router.post('/addCategory', controller.categoryController.addCategory);
router.post('/addTagToCategory', controller.categoryController.addTagsToCategory);

router.delete('/:categoryId', controller.categoryController.deleteCategoryById);

router.patch('/removeTag', controller.categoryController.removeTags)

module.exports = router;