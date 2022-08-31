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

   //Check for referential integrity (does the planet exist?)
   if(!await planets.findOne({ keplerName: launch.target })) {
      throw new Error(`Invalid planet name: ${launch.target}`);
   }

   latestFlightNumber++;

   //add default values to launch object
   Object.assign(launch, {
      customers: ['ZTM', 'NASA'],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true
   })

   //Add the new launch to MongoDB
   await launches.updateOne({flightNumber: latestFlightNumber}, launch, { upsert: true });

   //Return the launch from MongoDB
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
