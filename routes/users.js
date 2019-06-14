var express = require('express');
var router = express.Router();
var users = require('../controller/users.js');

router.get('/getUser', users.getUser);
router.post('/login', users.login);
router.post('/createUser', users.createUser);
router.post('/delUser', users.delUser);
module.exports = router;
