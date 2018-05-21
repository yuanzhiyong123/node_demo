const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://127.0.0.1:27017';
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));  //静态服务

app.use((req, res, next) => {
    console.log(new Date());
    next();
});

app.get('/', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if(err){
            console.log(err);
            return;
        }
        const db = client.db('demos');
        db.collection('goods').find({}).toArray((err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            const obj = {
                list: data
            }
            res.render('index', obj);
        });
    });
});

app.use((req,res, next) => {
    res.render('err');
});

app.listen(3001,'127.0.0.1',() => {
    console.log(`server run at 127.0.0.1:3001`);
});