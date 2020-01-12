import axios from 'axios';

export const searchOmdbByTitle = (title: string) => {
  return axios.get(`https://www.omdbapi.com/?s=${title}&apikey=7ba1d8a3`);
};

export const searchOmdbById = (id: string) => {
  return axios.get(`https://www.omdbapi.com/?i=${id}&apikey=7ba1d8a3`);
};
