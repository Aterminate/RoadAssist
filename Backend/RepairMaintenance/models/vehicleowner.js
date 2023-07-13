const mongoose = require('mongoose');
const vehicleOwnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  // Other properties related to the vehicle owner
});
const VehicleOwner = mongoose.model('VehicleOwner', vehicleOwnerSchema);
module.exports = VehicleOwner;