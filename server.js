'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=> console.log(`Listening on: ${PORT}`));

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});
