# City Explorer API

**Author**: Daniel Awesome
**Version**: 1.0.4

## Overview

This is a data server for city-explorer providing data package returns for requested information.  Currently it will be used to return weather data requested by the client.

## Getting Started

1. Clone the repository.
2. Create a .env file in the root directory.
3. Add PORT to the .env file and enter the port you wish to use. Use env.sample file as a template.
4. Add WEATHER_API_KEY with an API key to the .env file. Use env.sample file as a template.
5. Add MOVIEDB_API_KEY with an API key to the .env file. Use env.sample file as a template.

## Architecture

- Axios
- npm
- cors middle ware
- Heroku.com (for deploying the server)

## Change Log

Ver. 1.0.0 08-23-2022 2:55pm - Initial commit.

Ver. 1.0.1 08-23-2022 5:55pm - Added package handling and processing as well has serving requests up to clients based on their querries.

Ver. 1.0.2 08-24-2022 2:43pm - Prep for server handling of API calls and setup of readme file to reflect todays feature implimentation tracking.

Ver. 1.0.3 08-24-2022 6:33pm - Setup server side calls for weather data from weatherbit.io and pushed results to the client.

Ver. 1.0.4 08-24-2022 8:58pm - Handled all server traffic and data processing, both incomming and outgoing.

## Credit and Collaborations

- [The Movie DB Documents](https://developers.themoviedb.org/)

- [WeatherBit Documents](https://www.weatherbit.io/api/weather-forecast-16-day)

## Data Flow Chart

### Class 06 Data Flow Chart

![Data Flow](./img/DataFlow.jpg)

### Class 07 Data Flow Chart

![Data Flow](./img/DataFlow2.jpg)

### Class 08 Data Flow Chart

![Data Flow](./img/DataFlow3.jpg)

## Feature Implimentation Tracking

`Name of feature: Custom Servers with Node and Express`

Estimate of time needed to complete: 10hours

Start time: 3pm

Finish time: 11:30pm

Actual time needed to complete: 8

`Name of feature: API's`

Estimate of time needed to complete: 6 hours

Start time: 2:30pm

Finish time: 9:02pm

Actual time needed to complete: 6.5 hours
