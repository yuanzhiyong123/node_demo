const Koa = require('koa');
const router = require('koa-router')();
const ejs = require('ejs');
const views = require('koa-views');
const commonMethods = require('./modules/common');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(views('views',{
    extension: 'ejs'
}));
app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.state={
        name: 'yzy'
    }
    await next();
    
});

router.get('/',async (ctx) => {
    await ctx.render('index');
});

router.post('/doLogin', async ctx => {
    // let data = await commonMethods.getPostData(ctx);  //nodejs原生获取post数据方法
    let data = ctx.request.body;
    console.log(data);
    ctx.body=data;
});

router.get('/new/:id', async (ctx) => {
    console.log(ctx.params);
    console.log(ctx.query);
    ctx.body='news'
});

app.use(router.routes());


app.listen(3000);