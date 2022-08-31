const planets = require('./planets.mongo');

async function upsertPlanet(planet) {
   await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true });
}

async function getAllPlanets() {
   return await planets.find({});
}

module.exports = {
   upsertPlanet,
   getAllPlanets
};
