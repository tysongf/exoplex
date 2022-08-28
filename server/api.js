const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routers/planets.router');

const api = express();

api.use(cors({ origin: 'http://localhost:3000' }));
api.use(express.json());
api.use(planetsRouter);

module.exports = api;
