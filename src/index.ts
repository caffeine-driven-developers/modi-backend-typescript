import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import cors from '@koa/cors';

import search from './search';

dotenv.config(); // Load env variables from .env file

const app = new Koa();
const router = new Router();

router.use('/search', search.routes());

app
  .use(
    cors({
      origin: '*',
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001, () => {
  console.log('listening on port 3001');
});
