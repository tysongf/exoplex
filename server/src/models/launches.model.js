const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(id) {
   return await launches.findOne({ flightNumber: id });
}

async function getNewFlightNumber() {
   const latestLaunch = await launches.findOne().sort('-flightNumber');

   if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

   return latestLaunch.flightNumber + 1;
}

async function getAllLaunches() {
   return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function addNewLaunch(launch) {

   //Check for referential integrity (does the planet exist?)
   if(!await planets.findOne({ keplerName: launch.target })) {
      throw new Error(`Invalid planet name: ${launch.target}`);
   }

   const flightNumber = await getNewFlightNumber();

   //add default values to launch object
   Object.assign(launch, {
      customers: ['ZTM', 'NASA'],
      flightNumber: flightNumber,
      upcoming: true,
      success: true
   })

   //Add the new launch to MongoDB
   await launches.updateOne({flightNumber: flightNumber}, launch, { upsert: true });

   //Return the launch from MongoDB
   return await launches.findOne({ flightNumber: flightNumber}, { '_id': 0, '__v': 0 });
}

async function abortLaunchById(id) {
   const aborted = await launches.updateOne(
      { flightNumber: id },
      { upcoming: false, success: false }
   );

   if(aborted.modifiedCount === 1) {
      return await launches.findOne({ flightNumber: id}, { '_id': 0, '__v': 0 });
   } else {
      throw new Error('Abort Failed. The launch may already have been aborted.');
   }
}

module.exports = {
   existsLaunchWithId,
   getAllLaunches,
   addNewLaunch,
   abortLaunchById
}
