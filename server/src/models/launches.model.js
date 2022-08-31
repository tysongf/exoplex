const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

let latestFlightNumber = 100;

async function existsLaunchWithId(id) {
   return await launches.findOne({ flightNumber: id });
}

async function getAllLaunches() {
   return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function addNewLaunch(launch) {

   const planet = await planets.findOne({ keplerName: launch.target });

   if(!planet) {
      console.log("invalid planet");
      throw new Error(`Invalid planet name: ${launch.target}`);
   }

   await launches.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
   )

   latestFlightNumber++;

   Object.assign(launch, { //patch missing input
      customers: ['ZTM', 'NASA'],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true
   })

   await launches.updateOne({flightNumber: latestFlightNumber}, launch, { upsert: true });

   return await launches.findOne({ flightNumber: latestFlightNumber}, { '_id': 0, '__v': 0 });
}

async function getLaunch(id) {
   return await launches.findOne({ flightNumber: id }, { '_id': 0, '__v': 0 });
}

async function abortLaunchById(id) {
   const aborted = await getLaunch(id);
   aborted.upcoming = false;
   aborted.success = false;
   
   return await aborted.save();
}

module.exports = {
   existsLaunchWithId,
   getAllLaunches,
   addNewLaunch,
   getLaunch,
   abortLaunchById
}
