import { MovieList } from './../entity/MovieList';
import Router from 'koa-router';
import { getConnection } from 'typeorm';

const movieListRouter = new Router();

movieListRouter.get('/', async (ctx, next) => {
  const conn = await getConnection();
  const movieList = new MovieList();
  movieList.title = 'hello';
  movieList.created_at = new Date();
  movieList.updated_at = new Date();
  movieList.movie_id_list = ['1', '2', '3', '4', '5'];

  const movieListRepo = conn.getRepository(MovieList);

  await movieListRepo.save(movieList);
});

export default movieListRouter;
