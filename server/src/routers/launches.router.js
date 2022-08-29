const express = require('express');
const launchesController = require('../controllers/launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', launchesController.httpGetAllLaunches);
launchesRouter.post('/launches', launchesController.httpPostLaunch);
launchesRouter.delete('/launches/:id', launchesController.httpAbortLaunch)

module.exports = launchesRouter;
