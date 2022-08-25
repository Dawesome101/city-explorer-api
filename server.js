'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
///GETRIDOF///
let data = require('./data/weather.json');

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

  // try{
  //   let dataToGroom = data.findIndex(idx => idx.city_name === request.query.city);
  //   let dataToSend = 0;

  //   if(dataToGroom !== -1){
  //     dataToSend = getForcasts(dataToGroom);
  //   } else {
  //     dataToSend = `The database does not contain weather information for ${request.query.city}. To see weather data, please try searching for another city.`;
  //   }

  //   response.status(200).send(dataToSend);
  // } catch (error) {
  //   next(error);
  // }
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

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`Listening on: ${PORT}`));
