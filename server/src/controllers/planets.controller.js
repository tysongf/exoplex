const planets = require('../models/planets.model');

function httpGetAllPlanets(req, res) {
   return res.status(200).json(planets);
}

function httpPostPlanet(req, res) {
   return planetsService.addPlanet(req.body);
}

module.exports = {
   httpGetAllPlanets,
   httpPostPlanet
}
