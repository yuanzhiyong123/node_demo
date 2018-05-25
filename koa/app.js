const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/',async (ctx) => {
    ctx.body='hello';
});

router.get('/new/:id', async (ctx) => {
    console.log(ctx.params);
    console.log(ctx.query);
    ctx.body='news'
});

app.use(router.routes());


app.listen(3000);