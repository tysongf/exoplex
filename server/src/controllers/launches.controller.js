const {launches} = require('../models/launches.model');

function getAllLaunches(req, res) {
   return res.status(200).json(
      Array.from(launches.values()) //convert map values to an array
   );
}

function postLaunch(req, res) {
   //
}

module.exports = {
   getAllLaunches
}
