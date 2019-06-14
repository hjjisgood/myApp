var express = require('express');
var router = express.Router();
var product = require('../controller/product.js');

router.get('/getProducts', product.getProducts);
router.post('/editProduct', product.editProduct);
router.post('/createProduct', product.createProduct);



module.exports = router;