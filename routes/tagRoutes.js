const express = require('express');
const controller = require('../controller/index');
const middlewares = require('../middlewares')
const router = express.Router();


router.post('/addTag',middlewares.authenticateToken,middlewares.filter(['Admin']), controller.tagController.addTAg);
router.get('/allTag',middlewares.authenticateToken,middlewares.filter(['Admin']), controller.tagController.getAllTags);
router.get('/:tagId',middlewares.authenticateToken,middlewares.filter(['Admin']), controller.tagController.getTagById);
router.delete('/:tagId',middlewares.authenticateToken,middlewares.filter(['Admin']),controller.tagController.deleteTagById);


module.exports = router;