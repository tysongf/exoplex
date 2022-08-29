const launches = require('../models/launches.model');

function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      launches.getAllLaunches()
   );
}

function httpPostLaunch(req, res) {
   //
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch
}
