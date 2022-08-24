'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', (request, response) => {
  let dataToGroom = data.findIndex(idx => idx.city_name === request.query.city);
  let dataToSend = 0;

  if(dataToGroom !== -1){
    dataToSend = getForcasts(dataToGroom);
  } else {
    dataToSend = `The database does not contain information for ${request.query.city}. Please try searching for another city.`;
  }

  response.status(200).send(dataToSend);
});

function getForcasts(cityIndex){
  let tempForcast = [];
  for(let i = 0; i < data[cityIndex].data.length; i++){
    tempForcast.push(new Forecast(data[cityIndex].data[i]));
  }
  return tempForcast;
}

class Forecast {
  constructor(city) {
    this.date = city.valid_date;
    this.low_temp = city.low_temp;
    this.high_temp = city.high_temp;
    this.description = city.weather.description;
  }
}

app.listen(PORT, ()=> console.log(`Opened @: ${PORT}`));
