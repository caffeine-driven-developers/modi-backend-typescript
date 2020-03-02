import { MovieList } from './../entity/MovieList';
import Router from 'koa-router';
import { getConnection, Like } from 'typeorm';
import __ from 'lodash';

const movieListRouter = new Router();

function isNumeric(data: string): boolean {
  return !isNaN(Number(data));
}

movieListRouter.get('/:q?', async (ctx, next) => {
  const { q } = ctx.params;
  let err;
  let result;
  if (__.isNil(q)) {
    // q가 없으면 전체 리스트 리턴... 인데 좀 오버헤드 있긴함
    try {
      const conn = getConnection();
      const movieListRepo = conn.getRepository(MovieList);
      result = await movieListRepo.find();
    } catch (error) {
      err = error;
    }
  } else if (isNumeric(q)) {
    // q가 숫자면 그 movie_list_id를 갖는 아이템 반환
    try {
      const conn = getConnection();
      const movieListRepo = conn.getRepository(MovieList);
      result = await movieListRepo.findOne(Number.parseInt(q, 10));
      if (__.isNil(result)) {
        ctx.throw(404, 'No such movie list');
      }
    } catch (error) {
      err = error;
    }
  } else {
    // 것도 아니면 걍 문자열이라는 소린데 title이 그거랑 비슷헌 아이템 반환
    try {
      const conn = getConnection();
      const movieListRepo = conn.getRepository(MovieList);
      result = await movieListRepo.find({
        title: Like(`%${q}%`),
      });
    } catch (error) {
      err = error;
    }
  }

  if (err) {
    console.error('err', err);
    ctx.response.status = 400;
    ctx.body = JSON.stringify(err);
    return;
  }
  ctx.body = { result };
});

movieListRouter.post('/', async (ctx, next) => {
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
    ctx.throw(400, JSON.stringify(err));
  }
  ctx.body = 'success';
});

movieListRouter.patch('/', async ctx => {
  const { movieListId, title, movieIdList } = ctx.request.body;
  let err;

  try {
    const conn = getConnection();
    const movieListRepo = conn.getRepository(MovieList);
    const result = await movieListRepo.findOne({
      movie_list_id: movieListId,
    });

    if (__.isNil(result)) {
      ctx.throw(404, 'No such movie list');
    }

    if (__.isString(title)) {
      result!.title = title;
    }
    if (__.isArray(movieIdList) && __.isString(movieIdList[0])) {
      result!.movie_id_list = movieIdList; // TODO: movie_id_list string으로 바꾸기
    }
    await movieListRepo.save(result!);
  } catch (error) {
    err = error;
  }

  if (err) {
    ctx.throw(400, JSON.stringify(err));
  }
  ctx.body = 'success';
});

movieListRouter.delete('/:q', async ctx => {
  const { q } = ctx.params;
  let err;

  try {
    const conn = getConnection();
    const movieListRepo = conn.getRepository(MovieList);
    const result = await movieListRepo.findOne(Number.parseInt(q, 10));
    if (__.isNil(result)) {
      ctx.throw(404, 'No such movie list');
    }
    await movieListRepo.delete(result!);
  } catch (error) {
    err = error;
  }

  if (err) {
    ctx.throw(400, JSON.stringify(err));
  }
  ctx.body = 'success';
});

export default movieListRouter;
