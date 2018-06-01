const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const Db = require('./modules/db.js');
const DB = new Db();  //封装的mongodb 方法

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));  //静态服务
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',  //随意字符串  用于session签名
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10 },
    rolling: true  //每次执行操作 重置cookie过期时间
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbUrl = 'mongodb://127.0.0.1:27017';

app.use((req, res, next) => {
    if (req.url === '/doLogin' || req.url === '/login' || req.url === '/favicon.ico' || req.url === '/login2') {
        next();
    } else {
        if (req.session.userInfo && req.session.userInfo.username != '') {
            next();
        } else {
            res.redirect('/login');
        }
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/edit', (req, res) => {
    const query = req.query;
    DB.find('demo', 'product', { "_id": new objectId(query.id) }, function (data) {
        res.render('edit', { data: data[0] });
    });
});

app.get('/delete', (req, res) => {
    const query = req.query;
    DB.delete('demo', 'product', { "_id": new objectId(query.id) }, function (data) {
        res.redirect('/productList');
    });
});

app.get('/productList', (req, res) => {
    DB.find('demo', 'product', {}, function (data) {
        res.render('index', {
            list: data
        });
    });
});

app.post('/doLogin', (req, res) => {
    DB.find('demo', 'userInfo', req.body, function (data) {
        if (data.length > 0) {
            req.session.userInfo = req.body;
            res.redirect('/productList');
        } else {
            res.send("<script>alert('登陆失败'); location.href='/login'</script>");
        }
    });
});

app.post('/doAdd', (req, res) => {
    DB.insert('demo', 'product', req.body, function (data) {
        res.redirect('/productList');
    });
});

app.post('/doEdit', (req, res) => {
    const query = req.query;
    console.log(req.body);
    DB.update('demo', 'product', { "_id": new objectId(query.id) }, req.body, function (data) {
        res.redirect('/productList');
    });
});

app.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.redirect('/login');
});

app.get('/login2', (req, res) => {
    req.session.wxid = 'oJ8nzwc2EOS07bnaHAfpqVhHC26k'; //sesstion 写入openid
    res.json({
        result: true
    });
});

app.get('/test', (req, res) => {
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
        if (err) {
            console.log(err);
            return;
        }
        const db = client.db('test');
        var a = db.collection('test').findOneAndUpdate({ "name": "xiaoming666" }, { $push: {
            "list":{"name":'hello',"_id":new objectId()}
        } }, (err, data) => {
            console.log(data);
        })
        console.log(a);
    });
});

app.use((req, res, next) => {
    res.send('404');
});



app.listen(3001, '127.0.0.1', () => {
    console.log(`server run at 127.0.0.1:3001`);
});