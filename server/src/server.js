const { mongoConnect } = require('./services/mongo.js');
const { loadSpacexData } = require('./models/launches.model');
const loadPlanetsData = require('./commands/loadPlanets.command.js');
const http = require('http');
const app = require('./app');

//Initialize server application
const server = http.createServer(app);
const API_PORT = process.env.API_PORT || 8000;

async function startServer() {
   await mongoConnect();     //Connect to Mongo DB
   await loadPlanetsData();  //Load Exoplanet Data from CSV
   await loadSpacexData();   //Load SpaceX Launch Data
   server.listen(API_PORT, () => {
      console.log(`Listening on API_PORT: ${API_PORT} ...`);
   });
}

startServer();
