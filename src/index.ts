import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import search from './search';
import movieList from './movie_list';
import { createConnection } from 'typeorm';

dotenv.config(); // Load env variables from .env file

const app = new Koa();
const router = new Router();

router.use('/search', search.routes());
router.use('/movie-list', movieList.routes());

app
  .use(
    cors({
      origin: '*',
    }),
  )
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

createConnection().then(() => {
  app.listen(3001, () => {
    console.log('listening on port 3001');
  });
});
