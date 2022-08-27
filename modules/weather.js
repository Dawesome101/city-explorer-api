'use strict';

const axios = require('axios');
let cache = require('./cache.js');

const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const cacheInvalidationTime = 1000 * 60;

function getWeather(request, response, next) {
  try {
    let searchQueryLat = request.query.searchQueryLat;
    let searchQueryLon = request.query.searchQueryLon;
    const key = 'weather' + searchQueryLat + searchQueryLon;

    if (cache[key] && (Date.now() - cache[key].timestamp < cacheInvalidationTime)) {
      response.status(200).send(cache[key].data);
    } else {

      let params = {
        lat: searchQueryLat,
        lon: searchQueryLon,
        key: process.env.WEATHER_API_KEY
      };

      axios.get(baseURL, { params })
        .then(weatherResults => parseWeather(weatherResults.data))
        .then(parsedWeatherData => handleCaching(parsedWeatherData, key))
        .then(parsedWeatherData => response.status(200).send(parsedWeatherData))
        .catch(error => next(error));
    }
  } catch (error) {
    next(error);
  }
}

function parseWeather(weatherData) {
  try {
    let cityName = weatherData.city_name;
    const weatherSummaries = weatherData.data.map((cityData) => {
      return new Weather(cityName, cityData);
    });
    return Promise.resolve(weatherSummaries);
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

class Weather {
  constructor(cityName, cityData ) {
    this.city_name = cityName;
    this.valid_date = cityData.valid_date;
    this.low_temp = cityData.low_temp;
    this.high_temp = cityData.high_temp;
    this.description = cityData.weather.description;
  }
}

module.exports = getWeather;
