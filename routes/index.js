const express = require('express');
let bodyParser = require('body-parser');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const authController = require('../controller/auth');
const btcController = require('../controller/btc');
const mailController = require('../controller/mail');
const session = require('../middleware/session')
const formidableMiddleware = require('express-formidable');

router.post('/registrate', authController.registrate);
router.post('/login', authController.login);
router.get('/btc-chart', btcController.getBtcCharts);
router.post('/mail', formidableMiddleware(), mailController.sendMail);

// all routes that come after this middleware are protected
// and can only be accessed if the user is logged in
router.use(authenticate);
router.get('/session', authController.checkSession);
router.get('/logout', authController.logout);
router.post('/updateuser', authController.updateUser);
router.get('/deleteuser', authController.deleteUser);

router.post('/savechart', authController.saveChart);
router.get('/getchart', authController.getChart);



module.exports = router;