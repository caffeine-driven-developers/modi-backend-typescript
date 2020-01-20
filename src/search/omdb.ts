import axios from 'axios';

export const searchOmdbByTitle = (title: string) => {
  return axios.get(
    `https://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`,
  );
};

export const searchOmdbById = (id: string) => {
  return axios.get(
    `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`,
  );
};
