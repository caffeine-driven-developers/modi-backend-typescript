import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';

import search from './search';

dotenv.config(); // Load env variables from .env file

const app = new Koa();
const router = new Router();

router.use('/search', search.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on port 3000');
});
