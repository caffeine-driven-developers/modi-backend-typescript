import { searchOmdbById, searchOmdbByTitle } from './omdb';
import Router from 'koa-router';
import __ from 'lodash';

const searchRouter = new Router();

searchRouter.get('/', async (ctx, next) => {
  const { i: id, s: title } = ctx.request.query;
  if (__.isNil(id) && __.isNil(title)) {
    ctx.throw(400, 'bot i and t are missing');
  }

  if (!__.isNil(id) && !__.isNil(title)) {
    ctx.throw(409, 'please specify either i(id) or t(title)');
  }

  if (id) {
    const res = await searchOmdbById(id);
    ctx.body = res.data;
    return;
  }

  if (title) {
    const res = await searchOmdbByTitle(title);
    ctx.body = res.data;
    return;
  }
});

export default searchRouter;
