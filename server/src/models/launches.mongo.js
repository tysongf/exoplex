const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema(
   {
      flightNumber: { type: Number, required: true },
      launchDate: { type: Date, required: true },
      mission: { type: String, required: true },
      rocket: { type: String, required: true },
      //target: { type: mongoose.ObjectId, ref: 'Planet' }
      target: { type: String, required: true },
      customers: { type: [String], required: true },
      upcoming: { type: Boolean, required: true },
      success: { type: Boolean, required: true, default: true }
   }
);

//Compile the model. Connects launchesSchema with the 'launches' collection.
module.exports = mongoose.model('Launch', launchesSchema);