const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const url = require('url');
const ejs = require('ejs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const files = promisify(fs.readdir);
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017'

const config = {
    host: '127.0.0.1',
    port: 8081,
    root: process.cwd()
}
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const method = req.method.toLowerCase();
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(method);
    if(method === 'get') {
        if(pathName === '/home') {

            // let arr = [1,2,3,4];
            // ejs.renderFile('app/views/home.html',{msg:arr}, (err,data) => {
            //     res.end(data);
            // });
            // MongoClient.connect(mongoUrl, (err, client) => {
            //     if(err) throw err;
            //     const db = client.db('demos');
            //     db.collection('goods'). insertOne({
            //         name: "nodejs",
            //         age:30
            //     }, (err, data) => {
            //         if(err) throw err;
            //         console.log('插入数据成功');
            //         db.close();  //关闭数据库
            //         res.end('插入数据成功！');
            //     })
            // });

            MongoClient.connect(mongoUrl, (err, client) => {
                if(err) {
                    console.log(err);
                    return;
                }
                const db = client.db('demos');
                // db.collection('goods').insertMany([
                //     {name: 'yuan1', age: 27},
                //     {name: 'zhi1', age: 27},
                //     {name: 'yong1', age: 27},
                //     {name: 'hah1', age: 27},
                // ], (err, data) => {
                //     if(err) {
                //         console.log(err);
                //     }
                //     client.close();  //关闭数据库
                //     res.end('添加成功');
                // })
                db.collection("goods"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    console.log(result);
                    client.close();
                    res.end(result.toString());
                });
            })
        }
    } else if(method === 'post') {

    }
});

server.listen(config.port, config.host, () => {
    const addr = `http://${config.host}:${config.port}`
    console.log(`run at ${chalk.green(addr)}`);
});

