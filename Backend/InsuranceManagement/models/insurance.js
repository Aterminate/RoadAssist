const mongoose = require('mongoose');

// Define the Insurance schema
const inauranceSchema = new mongoose.Schema({
   policy_number: {
    type: String,
    required: true,
  },
  damage_estimate: {
    type: Number,
    required: true,
  },
  repair_cost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved','rejected'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
// Create the Insurance model
const Insurance = mongoose.model('Insurance', inauranceSchema);

// Export the Insurance model
module.exports = Insurance;