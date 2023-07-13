const mongoose = require('mongoose');

const repairMaintenanceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  maintenanceType: { type: String, required: true },
  repairType: { type: String, required: true },
  maintenanceSchedule: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
  },
  // Other properties related to repair and maintenance
});
const RepairMaintenance = mongoose.model('RepairMaintenance', repairMaintenanceSchema);
module.exports = RepairMaintenance;