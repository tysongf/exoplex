require('dotenv').config(); //load environment variables
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const apiV1 = require('./routers/api.v1');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); //deprecated. Client using same port as server
app.use(morgan('combined')); //http logging to console
app.use(express.json()); //parse json requests

app.use('/v1', apiV1);

//Serve client site at root url
app.use(express.static(path.join(__dirname, '..', 'public')));

//Enable client-side routing
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;
