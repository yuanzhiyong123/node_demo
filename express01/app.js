const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const session = require('express-session');
var bodyParser = require('body-parser');


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbUrl = 'mongodb://127.0.0.1:27017';

app.use((req, res, next) => {
    if(req.url === '/doLogin' ||req.url === '/login' || req.url ==='/favicon.ico') {
        next();
    }else {
        if(req.session.userInfo && req.session.userInfo.username !='') {
            next();
        }else {
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
    res.render('edit');
});

app.get('/productList', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if(err) {
            console.log(err);
            return;
        }
        const db = client.db('demo');
        db.collection('product').find({}).toArray((err, data) => {
            if(err) {
                console.log(err);
            }
            res.render('index', {
                list: data
            });
            client.close();
        });
    });
});

app.post('/doLogin', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if(err) {
            console.log(err);
            return;
        }
        const db = client.db('demo');
        db.collection('userInfo').find(req.body).toArray((err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            if(data.length > 0) {
                req.session.userInfo=req.body;
                res.redirect('/productList');
            }else{
                res.send("<script>alert('登陆失败'); location.href='/login'</script>");
            }
            client.close();
        });
    });
});

app.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.redirect('/login');
});

app.use((req, res, next) => {
    res.send('404');
});

app.listen(3001, '127.0.0.1', () => {
    console.log(`server run at 127.0.0.1:3001`);
});