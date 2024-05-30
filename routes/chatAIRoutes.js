const express = require('express');
const gemini_pro = require('../chatBox/gemini-pro');

const router = express.Router();

router.post('/chatMessage',gemini_pro.run)



module.exports = router;