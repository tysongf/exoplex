const http = require('http');
const { mongoConnect } = require('./services/mongo.js');
const app = require('./app');
const loadPlanetsData = require('./commands/loadPlanets.command');
const server = http.createServer(app);
const API_PORT = process.env.API_PORT || 8000;

async function startServer() {
   //Connect to Mongo DB with mongoose
   await mongoConnect();
   await loadPlanetsData();
   server.listen(API_PORT, () => {
      console.log(`Listening on API_PORT: ${API_PORT} ...`);
   });
}

startServer();
