const launches = require('../models/launches.model');

function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      launches.getAllLaunches()
   );
}

function httpPostLaunch(req, res) {
   const newLaunch = req.body;

   if(!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket
      || !newLaunch.destination) {
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

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch
}
