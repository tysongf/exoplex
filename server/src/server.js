const http = require('http');
const { mongoConnect } = require('./services/mongo.js');
const api = require('./api');
const loadPlanetsData = require('./commands/loadPlanets.command');
const api_server = http.createServer(api);
const API_PORT = process.env.API_PORT || 8000;

async function startServer() {
   //Connect to Mongo DB with mongoose
   await mongoConnect();
   await loadPlanetsData();
   api_server.listen(API_PORT, () => {
      console.log(`Listening on API_PORT: ${API_PORT} ...`);
   });
}

startServer();
