import Router from 'koa-router';
import axios from 'axios';

import __ from 'lodash';

const moviesRouter = new Router();

function getMovieById(imdbID: string) {
  return axios.get(
    `https://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=${process.env.OMDB_API_KEY}`,
  );
}

moviesRouter.get('/:id?', async (ctx, next) => {
  const { id: imdbID } = ctx.params;
  if (__.isNil(imdbID)) {
    ctx.throw(400, 'id nil');
  }
  const res = await getMovieById(imdbID);
  ctx.body = res.data;
  return;
});

export default moviesRouter;
