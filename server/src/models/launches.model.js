const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_LAUNCH_QUERY_URL = 'https://api.spacexdata.com/v4/launches/query';

const launchExample = {
   //spaceX mapping in comments
   flightNumber: 100, //flight_number
   mission: 'Kepler Exploration X', //name (launch name)
   rocket: 'Explorer 1', //rocket.name
   launchDate: new Date('October 3, 2016'), //
   target: 'Kepler-442 b', //not applicable
   customers: ['ZTM', 'NASA'], //payload.customers (launches may have multiple payloads)
   upcoming: true, //upcoming
   success: true, //success
}

async function findLaunch(filter) {
   return await launches.findOne(filter);
}

async function populateSpacexLaunchData() {
   const spacex_response = await axios.post(
      SPACEX_LAUNCH_QUERY_URL,
      {
         query: {},
         options: {
            pagination: false, //get ALL the launches!
            populate: [
                {
                     path: "rocket",
                     select: {
                        name: 1
                     }
                },
                {
                  path: "payloads",
                  select: {
                     customers: 1
                  }
                }
            ]
        }
      }
   );

   if(spacex_response.status !== 200) {
      const error = 'Failed to download SpaceX Launch Data';
      console.log(error);
      throw new Error(error)
   }

   for(const launchDoc of spacex_response.data.docs) {
      const payloads = launchDoc['payloads'];
      const customers = payloads.flatMap((payload) => { return payload['customers'] });
      const newLaunch = {
         flightNumber: launchDoc['flight_number'],
         mission: launchDoc['name'],
         rocket:  launchDoc['rocket.name'],
         launchDate: new Date(launchDoc['date_local']),
         customers:  customers,
         upcoming:  launchDoc['upcoming'],
         success:  launchDoc['success'],
      }
      console.log('Importing SpaceX Launch: ' + newLaunch.flightNumber + ' - ' + newLaunch.mission);
      await addNewLaunch(newLaunch);
   }
}

//Load SpaceX Launch Data Once
async function loadSpacexData() {
   if(await findLaunch({ flightNumber: 1, mission: 'FalconSat' })) {
      console.log('SpaceX Data Already Loaded');
   } else {
      console.log("Loading SpaceX Data");
      populateSpacexLaunchData();
   }
}

async function existsLaunchWithId(id) {
   return await findLaunch({ flightNumber: id });
}

async function getNewFlightNumber() {
   const latestLaunch = await launches.findOne().sort('-flightNumber');

   if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

   return latestLaunch.flightNumber + 1;
}

async function getAllLaunches(limit, page) {
   return await launches
   .find({}, { '_id': 0, '__v': 0 })
   .limit(limit)
   .skip((page -1) * limit);
}

async function addNewLaunch(launch) {

   //Add the new launch to MongoDB
   await launches.updateOne({flightNumber: launch.flightNumber}, launch, { upsert: true });

   //Return the launch from MongoDB
   return await launches.findOne({ flightNumber: launch.flightNumber}, { '_id': 0, '__v': 0 });
}

async function scheduleNewLaunch(launch) {
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

   return addNewLaunch(launch);
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
   loadSpacexData,
   existsLaunchWithId,
   getAllLaunches,
   addNewLaunch,
   scheduleNewLaunch,
   abortLaunchById
}
