const launches = require('../models/launches.model');

async function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      await launches.getAllLaunches()
   );
}

async function httpPostLaunch(req, res) {
   const newLaunch = req.body;

   if(!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket
      || !newLaunch.target) {
         return res.status(400).json({error: 'Missing required launch property'});
      }

   newLaunch.launchDate = new Date(newLaunch.launchDate);

   if(isNaN(newLaunch.launchDate)) {
      return res.status(400).json({error: 'Invalid launch date.'});
   }

   return res.status(201).json(
      await launches.addNewLaunch(newLaunch)
   )
}

async function httpAbortLaunch(req, res) {
   const launchId = Number(req.params.id); //launches key is an integer
   if(await !launches.existsLaunchWithId(launchId)) {
      res.status(404).json({ 'error': `Launch ${launchId} not found.`});
   }
   res.status(200).json(launches.abortLaunchById(launchId));
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch,
   httpAbortLaunch
}
