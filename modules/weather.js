'use strict';

const axios = require('axios');

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

function getForcasts(cityPacket){
  let tempArr = [];

  for(let i = 0; i < 3; i++){
    let tempObj = new Forecast(cityPacket.data[i], cityPacket.city_name);
    tempArr.push(tempObj);
  }

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

module.exports = getWeather;
