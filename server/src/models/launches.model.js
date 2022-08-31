const launches = require('./launches.mongo');

let latestFlightNumber = 100;

async function saveLaunch(launch) {
   await launches.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
   )
}

async function existsLaunchWithId(id) {
   return await launches.findOne({ flightNumber: id });
}

async function getAllLaunches() {
   return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function addNewLaunch(launch) {
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
   saveLaunch,
   getAllLaunches,
   addNewLaunch,
   getLaunch,
   abortLaunchById
}
