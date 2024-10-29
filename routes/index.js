const express = require('express');
const router = express.Router();
const mailController = require('../controller/mail');
const formidableMiddleware = require('express-formidable');

router.post('/mail', formidableMiddleware(), mailController.sendMail);
module.exports = router;