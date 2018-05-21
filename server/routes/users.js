var express = require('express');
var router = express.Router();
// var data = require('../api/index.json');
var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/demos'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.header("Access-Control-Allow-Origin", "*");
  var path2 = path.join(__dirname,'../api/index.json');
  MongoClient.connect({ url: true }, (err, db) => {
    if(err) {throw err}
    db.collection('goods').insertOne({
      name: "zhaowu",
      age: 30
    }, (err, res) => {
      if(err) throw err;
      res.end('插入数据库成功！'); 
    })
  })
});

module.exports = router;
