const http = require('http');
const mongoose = require('mongoose');
const api = require('./api');
const loadPlanetsData = require('./commands/loadPlanets.command');
const api_server = http.createServer(api);
const API_PORT = process.env.API_PORT || 8000;

const DB_CLUSTER = 'cluster0';
const DB_NAME = 'nasa';
const DB_USER = 'nasa';
const DB_PASSWORD = '1yxvWqcpXquiurnK';

const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.dtleewu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
   console.log("MongoDB Connection Open!");
});

mongoose.connection.on('error', (error) => {
   console.error(error);
});

async function startServer() {
   //Connect to Mongo DB with mongoose
   await mongoose.connect(MONGO_URL);
   await loadPlanetsData();
   api_server.listen(API_PORT, () => {
      console.log(`Listening on API_PORT: ${API_PORT} ...`);
   });
}

startServer();
