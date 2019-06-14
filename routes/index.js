var express = require('express');
var router = express.Router();
var upload=require('../controller/uploadImg');
var usersRouter = require('./users');
var productRouter = require('./product');
var warehouseRouter = require('./warehouse');
module.exports =function(app){
  app.use('/upload',upload);
  app.use('/users',usersRouter);
  app.use('/product',productRouter);
  app.use('/warehouse',warehouseRouter);
}
