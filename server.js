'use strict';


//*****REQUIRES******

const express = require('express');
require('dotenv').config();
const cors = require('cors');


const data = require('./data/weather.json');
const { response } = require('express');


// **** app is the server *****
const app = express();


//***** define middleware that allows sharing resources across the internet ****
app.use(cors());


//***** define the port for the server to run on ******/
const PORT = process.env.PORT || 3002;


//****** TRY endpoints that use GET / method that use a callback with 2 arg = req, res *******/
app.get('/', (req, res) => {
  res.status(200).send('Welcome to our server');
});

//**** define weather endpoints ****/
app.get('/', (req, res, next) => {

  // **** accept search queries - lat, lon, searchQuery - request.query /weather?lat, lon, query=value
  try {
    // let lat = req.query.lat;
    // let lon = res.query.lon;
    let cityName = req.query.searchQuery;
    let city = data.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());

    let weatherData = city.data.map(dayObj => new Forecast(dayObj));

    // *** verify working data from weather data ****
    response.status(200).send(weatherData);

  } catch(error) {
    next(error);
  }
});

// *** groom data for forecast class ****
class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}

// *** Catch all should be the last defined endpoint ****

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

//***** error handling *****/
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

//******start server******/
app.listen(PORT, () => console.log(`running on port: ${PORT}`));

