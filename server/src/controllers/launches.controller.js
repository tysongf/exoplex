const launches = require('../models/launches.model');

function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      launches.getAllLaunches()
   );
}

function httpPostLaunch(req, res) {
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
      launches.addNewLaunch(newLaunch)
   )
}

function httpAbortLaunch(req, res) {
   const launchId = Number(req.params.id); //launches key is an integer
   if(!launches.existsLaunchWithId(launchId)) {
      res.status(404).json({ 'error': `Launch ${launchId} not found.`});
   }
   res.status(200).json(launches.abortLaunchById(launchId));
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch,
   httpAbortLaunch
}
