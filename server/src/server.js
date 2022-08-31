const http = require('http');
const api = require('./api');
const loadPlanetsData = require('./commands/load-planets');
const api_server = http.createServer(api);
const API_PORT = process.env.API_PORT || 8000;

async function startServer() {
   await loadPlanetsData();
   api_server.listen(API_PORT, () => {
      console.log(`Listening on API_PORT: ${API_PORT} ...`);
   });
}

startServer();
