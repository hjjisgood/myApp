var express = require('express');
var router = express.Router();
var warehouse = require('../controller/warehouse.js');
router.get('/getWarehouse',warehouse.getWarehouse)
router.post('/newIn',warehouse.newIn)
router.post('/setWarehouse',warehouse.setWarehouse)
router.get('/getHisIn',warehouse.getHisIn)
router.get('/getHisOut',warehouse.getHisOut)
router.get('/getHis',warehouse.getHis)
module.exports = router;