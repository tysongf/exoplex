const os = require('os');
const cluster = require('cluster');
const http = require('http');
const api = require('./api');
const loadPlanetsData = require('./commands/load-planets');
const api_server = http.createServer(api);
const API_PORT = process.env.API_PORT || 8000;

async function startServer() {
   await loadPlanetsData();

   //Master process spawns child processes to run API
   if(cluster.isMaster) {
      //Detect number of CPUs and create child processes
      const NUM_CPUS = os.cpus().length;
      console.log(`Server has ${NUM_CPUS} logical processors.`);
      for(let cpu = 0; cpu < NUM_CPUS; cpu++) {
         console.log(`Initializing process: ${cpu}`);
         cluster.fork();
      }
   } else {
      //Child processes run API server
      api_server.listen(API_PORT, () => {
         console.log(`Listening on API_PORT: ${API_PORT} ...`);
      });
   }
}

startServer();
