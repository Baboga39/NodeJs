const express = require('express');
const controller = require('../controller/index');
const middlewares = require('../middlewares')
const router = express.Router();


router.post('/addTag',middlewares.authenticateToken, controller.tagController.addTAg);
router.get('/allTag',middlewares.authenticateToken, controller.tagController.getAllTags);
router.get('/:tagId',middlewares.authenticateToken, controller.tagController.getTagById);
router.delete('/:tagId',middlewares.authenticateToken,controller.tagController.deleteTagById);


module.exports = router;