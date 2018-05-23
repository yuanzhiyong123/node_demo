const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://127.0.0.1:27017';

class DB{
    connect(fn) {
        MongoClient.connect(dbUrl, (err, client) => {
            if(err) {
                console.log('数据库连接失败');
                return;
            }
            fn(client);
        })
    }
    
    find(dbName,colName,json,fn) {
        this.connect((client) => {
            const db = client.db(dbName);
            db.collection(colName).find(json).toArray((err,data) => {
                if(err) {
                    console.log(err);
                }
                fn(data);
                client.close();
            });
        });
    }

    insert(dbName,colName,json,fn) {
        this.connect((client) => {
            const db = client.db(dbName);
            db.collection(colName).insertOne(json,(err,data) => {
                if(err) {
                    console.log(err);
                }
                fn(data);
                client.close();
            });
        });
    }

    update(dbName,colName,json,json2,fn) {
        this.connect((client) => {
            const db = client.db(dbName);
            db.collection(colName).update(json,{$set:json2},(err,data) => {
                if(err) {
                    console.log(err);
                }
                fn(data);
                client.close();
            });
        });
    }

    delete(dbName,colName,json,fn) {
        this.connect((client) => {
            const db = client.db(dbName);
            db.collection(colName).deleteOne(json,(err,data) => {
                if(err) {
                    console.log(err);
                }
                fn(data);
                client.close();
            });
        });
    }
}
module.exports = DB;