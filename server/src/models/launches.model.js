const launches = new Map();

let latestFlightNumber = 100;

const launch = {
   flightNumber: 100,
   mission: 'Kepler Exploration X',
   rocket: 'Explorer IS1',
   launchDate: new Date('December 27, 2030'),
   target: 'Kepler-442 b',
   customers: ['ZTM', 'NASA'],
   upcoming: true,
   success: true
}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(id) {
   return launches.has(id);
}

function getAllLaunches() {
   return Array.from(launches.values());
}

function addNewLaunch(launch) {
   latestFlightNumber++;
   launches.set(
      latestFlightNumber,
      Object.assign(launch, { //patch missing input
         customers: ['ZTM', 'NASA'],
         flightNumber: latestFlightNumber,
         upcoming: true,
         success: true
      })
   );
   return launches.get(latestFlightNumber);
}

function getLaunch(id) {
   return launches.get(id);
}

function abortLaunchById(id) {
   const aborted = getLaunch(id);
   aborted.upcoming = false;
   aborted.success = false;
   return aborted;
}

module.exports = {
   existsLaunchWithId,
   getAllLaunches,
   addNewLaunch,
   getLaunch,
   abortLaunchById
}
