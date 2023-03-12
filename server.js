'use strict';


//*****REQUIRES******

const express = require('express');
require('dotenv').config();
const cors = require('cors');


// **** app is the server *****
const app = express();


//***** define middleware that allows sharing resources across the internet ****
app.use(cors());


//***** define the port for the server to run on ******/
const PORT = process.env.PORT || 3002;


//****** endpoints that use GET / method that use a callback with 2 arg = req, res *******/
app.get('/', (request, response) => {
  response.status(200).send('welcome user!');
});

//******start server******/
app.listen(PORT, () => console.log(`running on port: ${PORT}`));

