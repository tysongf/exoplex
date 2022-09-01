const {
   addNewLaunch,
   getAllLaunches,
   existsLaunchWithId,
   abortLaunchById
} = require('../models/launches.model');

async function httpGetAllLaunches(req, res) {
   return res.status(200).json(
      await getAllLaunches()
   );
}

async function httpPostLaunch(req, res) {
   let newLaunch = req.body;

   if(!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket || !newLaunch.target) {
      return res.status(400).json({error: 'Missing required launch property'});
   }

   newLaunch.launchDate = new Date(newLaunch.launchDate);

   if(isNaN(newLaunch.launchDate)) {
      return res.status(400).json({error: 'Invalid launch date.'});
   }

   try {
      return res.status(201).json(await addNewLaunch(newLaunch));
   }
   catch(err) {
      return res.status(400).json({error: err.message});
   }

}

async function httpAbortLaunch(req, res) {
   const launchId = Number(req.params.id); //launches key is an integer
   if(await !existsLaunchWithId(launchId)) {
      res.status(404).json({ 'error': `Launch ${launchId} not found.`});
   }
   try {
      res.status(200).json(await abortLaunchById(launchId));
   } catch(err) {
      res.status(400).json({ 'error': err.message });
   }
   
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch,
   httpAbortLaunch
}
