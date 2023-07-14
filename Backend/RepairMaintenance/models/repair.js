const mongoose = require('mongoose');

const repairMaintenanceSchema = new mongoose.Schema({
 /*  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, */
  repair_type: { type: String, required: true },
  repair_cost: { type: String, required: true },
  maintenance_schedule: { type: String, required: true },
  // Other properties related to repair and maintenance
});
const RepairMaintenance = mongoose.model('RepairMaintenance', repairMaintenanceSchema);
module.exports = RepairMaintenance;