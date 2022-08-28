'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=> console.log(`Listening on: ${PORT}`));

const getWeather = require('./modules/weather.js');
app.get('/weather', getWeather);

const getMovies = require('./modules/movies.js');
app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});
