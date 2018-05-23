var express = require('express');
var router = express.Router();
// var data = require('../api/index.json');
var fs = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200);
  res.header("Access-Control-Allow-Origin", "*");
  var path2 = path.join(__dirname, '../api/index.json');
  // req.session.wxid = 'oJ8nzwc2EOS07bnaHAfpqVhHC26k'; //sesstion 写入openid
    res.json({
        result: true
    });
});

module.exports = router;
