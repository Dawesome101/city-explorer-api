'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/weather', getWeather);
async function getWeather(request, response, next) {
  try {
    let searchQueryLat = request.query.searchQueryLat;
    let searchQueryLon = request.query.searchQueryLon;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${searchQueryLat}&lon=${searchQueryLon}&key=${process.env.WEATHER_API_KEY}`;
    const weatherResponse = await axios.get(url);

    let returnWeather = getForcasts(weatherResponse.data);

    response.status(200).send(returnWeather);
  } catch (error){
    next(error);
  }
}

app.get('/movies', getMovieData);
async function getMovieData(request, response, next) {
  try {
    let searchQuery = request.query.searchQuery;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=&query=${searchQuery}`;
    let unprocessedMovies = await axios.get(url);

    let returnMovies = getMovies(unprocessedMovies.data.results);

    response.status(200).send(returnMovies);
  } catch(error) {
    next(error);
  }
}

function getForcasts(cityPacket){
  let tempArr = [];

  for(let i = 0; i < 3; i++){
    let tempObj = new Forecast(cityPacket.data[i], cityPacket.city_name);
    tempArr.push(tempObj);
  }

  return tempArr;
}

function getMovies(moviePacket){
  let tempArr = [];

  moviePacket.forEach((movie) => {
    let tempObj = new Movie(movie);
    tempArr.push(tempObj);
  });

  return tempArr;
}

class Forecast {
  constructor(data, city_name) {
    this.city_name = city_name;
    this.valid_date = data.valid_date;
    this.low_temp = data.low_temp;
    this.high_temp = data.high_temp;
    this.description = data.weather.description;
  }
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

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`Listening on: ${PORT}`));
