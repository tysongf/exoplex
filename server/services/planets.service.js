const planets = [];

function getPlanets() {
   return planets;
}

function getPlanet(planet_id) {
   return planets[planet_id];
}

function addPlanet(planet) {
   planets.push(planet);
}

module.exports = {
   getPlanets,
   getPlanet,
   addPlanet
}
