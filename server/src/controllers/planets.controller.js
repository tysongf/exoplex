const planets = require('../models/planets.model');

function getAllPlanets(req, res) {
   return res.status(200).json(planets);
}

function postPlanet(req, res) {
   return planetsService.addPlanet(req.body);
}

module.exports = {
   getAllPlanets,
   postPlanet
}
