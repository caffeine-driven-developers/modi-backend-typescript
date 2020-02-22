import { MovieList } from './../entity/MovieList';
import Router from 'koa-router';
import { getConnection } from 'typeorm';

const movieListRouter = new Router();

movieListRouter.get('/', async (ctx, next) => {
  const conn = getConnection();
  const movieList = new MovieList();
  movieList.title = 'hello';
  movieList.created_at = new Date();
  movieList.updated_at = new Date();
  movieList.movie_id_list = ['1', '2', '3', '4', '5'];

  const movieListRepo = conn.getRepository(MovieList);

  await movieListRepo.save(movieList);
});

movieListRouter.post('/', async (ctx, next) => {
  console.log('ctx', ctx.request.body);
  const { title, movieIdList } = ctx.request.body;

  let err;
  try {
    const conn = getConnection();
    const movieList = new MovieList();
    movieList.title = title;
    movieList.created_at = new Date();
    movieList.updated_at = new Date();
    movieList.movie_id_list = movieIdList;

    const movieListRepo = conn.getRepository(MovieList);
    await movieListRepo.save(movieList);
  } catch (error) {
    err = error;
  }

  if (err) {
    ctx.response.status = 400;
    ctx.body = JSON.stringify(err);
    return;
  }
  ctx.body = 'success';
});

export default movieListRouter;
