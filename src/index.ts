import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = '흠zz';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on port 3000');
});
