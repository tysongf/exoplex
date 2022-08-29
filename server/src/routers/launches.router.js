const express = require('express');
const launchesController = require('../controllers/launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', launchesController.httpGetAllLaunches);
launchesRouter.post('/launches', launchesController.httpPostLaunch);

module.exports = launchesRouter;
