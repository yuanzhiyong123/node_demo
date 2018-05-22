const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));  //静态服务
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',  //随意字符串  用于session签名
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
  }))

const dbUrl = 'mongodb://127.0.0.1:27017';

app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    // res.cookie('username','zhiyong');
    // req.session.userInfo = 'nihao';
   /* MongoClient.connect(dbUrl, (err, client) => {
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
            client.close();
        });
    });*/
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/add', (req, res) => {
    res.render('edit');
});

app.get('/productList', (req, res) => {
    res.render('index');
});

app.use((req,res, next) => {
    res.render('err');
});

app.listen(3001,'127.0.0.1',() => {
    console.log(`server run at 127.0.0.1:3001`);
});