'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;
    let unprocessedMovies = await axios.get(url);

    let returnMovies = processMovies(unprocessedMovies.data.results);

    response.status(200).send(returnMovies);
  } catch(error) {
    next(error);
  }
}

function processMovies(moviePacket){
  let tempArr = [];

  moviePacket.forEach((movie) => {
    let tempObj = new Movie(movie);
    tempArr.push(tempObj);
  });

  return tempArr;
}

class Movie {
  constructor(movie){
    this.title = movie.title;
    this.backdrop = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
    this.poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.vote_count = movie.vote_count;
    this.popularity = movie.popularity;
    this.overview = movie.overview;
  }
}

module.exports = getMovies;
