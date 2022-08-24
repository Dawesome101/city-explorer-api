'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', (request, response, next) => {
  try{
    let dataToGroom = data.findIndex(idx => idx.city_name === request.query.city);
    let dataToSend = 0;

    if(dataToGroom !== -1){
      dataToSend = getForcasts(dataToGroom);
    } else {
      dataToSend = `The database does not contain weather information for ${request.query.city}. To see weather data, please try searching for another city.`;
    }

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

function getForcasts(cityIndex){
  let tempForcast = [];
  for(let i = 0; i < data[cityIndex].data.length; i++){
    tempForcast.push(new Forecast(data[cityIndex].data[i], data[cityIndex].city_name));
  }
  return tempForcast;
}

class Forecast {
  constructor(cityData, cityName) {
    this.city = cityName;
    this.date = cityData.valid_date;
    this.low_temp = cityData.low_temp;
    this.high_temp = cityData.high_temp;
    this.description = cityData.weather.description;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`Opened @: ${PORT}`));
