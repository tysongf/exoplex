const launches = require('../models/launches.model');

function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      launches.getAllLaunches()
   );
}

function httpPostLaunch(req, res) {
   const newLaunch = req.body;
   newLaunch.launchDate = new Date(newLaunch.launchDate);
   return res.status(201).json(
      launches.addNewLaunch(newLaunch)
   )
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch
}
