import axios from 'axios';

export const searchOmdbByTitle = (title: string) => {
  return axios.get(
    `https://www.omdbapi.com/?s=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`,
  );
};

export const searchOmdbById = (id: string) => {
  return axios.get(
    `https://www.omdbapi.com/?i=${id}&type=movie&apikey=${process.env.OMDB_API_KEY}`,
  );
};
