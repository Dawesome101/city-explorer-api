'use strict';

const axios = require('axios');
let cache = require('./cache.js');

const baseURL = 'https://api.themoviedb.org/3/search/movie';
const cacheInvalidationTime = 1000 * 60;

async function getMovies(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;
    let key = 'movies' + searchQuery;

    if (cache[key] && (Date.now() - cache[key].timestamp < cacheInvalidationTime)) {
      response.status(200).send(cache[key].data);
    } else {

      let params = {
        api_key: process.env.MOVIEDB_API_KEY,
        language: 'en-US',
        page: 1,
        include_adult: false,
        query: searchQuery
      };

      axios.get(baseURL, { params })
        .then(movieResults => (parseMovies(movieResults)))
        .then(parsedMovieData => handleCaching(parsedMovieData, key))
        .then(parsedMovieData => response.status(200).send(parsedMovieData))
        .catch(error => next(error));
    }
  } catch(error) {
    next(error);
  }
}

function parseMovies(movieResults){
  try{
    const movieSummaries = movieResults.data.results.map((movie) => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (error) {
    return Promise.reject(error);
  }
}

function handleCaching(parsedData, key){
  try{
    cache[key] = {
      data: parsedData,
      timestamp: Date.now()
    };
    return Promise.resolve(cache[key].data);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Movie {
  constructor(movie){
    this.title = movie.title;
    this.backdrop = movie.backdrop_path;
    this.poster = movie.poster_path;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.vote_count = movie.vote_count;
    this.popularity = movie.popularity;
    this.overview = movie.overview;
  }
}

module.exports = getMovies;
