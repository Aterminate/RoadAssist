const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  // Other properties related to the vehicle
});
const Vehicle  = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;