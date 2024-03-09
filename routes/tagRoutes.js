const express = require('express');
const controller = require('../controller/index');

const router = express.Router();


router.post('/addTag', controller.tagController.addTAg);
router.get('/allTag', controller.tagController.getAllTags);
router.get('/:tagId', controller.tagController.getTagById);
router.delete('/:tagId',controller.tagController.deleteTagById);


module.exports = router;