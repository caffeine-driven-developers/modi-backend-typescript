import { searchOmdbById, searchOmdbByTitle } from './omdb';
import Router from 'koa-router';
import __ from 'lodash';

const search = new Router();

search.get('/', async (ctx, next) => {
  console.log(1);
  const { i: id, s: title } = ctx.request.query;
  if (__.isNil(id) && __.isNil(title)) {
    ctx.response.status = 400; // Not Acceptable
    ctx.body = 'both i and t are missing';
    return;
  }
  if (!__.isNil(id) && !__.isNil(title)) {
    ctx.response.status = 409; // Conflict
    ctx.body = 'please specify either i(id) or t(title)';
    return;
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

export default search;
