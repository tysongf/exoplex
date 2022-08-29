const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routers/planets.router');
const launchesRouter = require('./routers/launches.router');

const api = express();

api.use(cors({ origin: 'http://localhost:3000' }));
api.use(morgan('combined'));
api.use(express.json());
api.use(planetsRouter);
api.use(launchesRouter);
api.use(express.static(path.join(__dirname, '..', 'public')));
api.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = api;
