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
  MongoClient.connect(dbUrl, (err, client) => {
    if (err) { throw err }
    var db = client.db('demos');
    db.collection('goods').find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      var obj = {
        data
      }
      console.log(data);
      res.json(obj);
    });
  })
});

module.exports = router;
