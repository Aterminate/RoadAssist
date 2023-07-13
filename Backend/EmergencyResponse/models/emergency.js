const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    callerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emergencyType: { type: String, required: true },
    location: { type: String, required: true },
    //timestamp: { type: Date, default: Date.now },
   // userId: { type: String, required: true },
   // userEmail: { type: String, required: true },
});

module.exports = mongoose.model('Emergency', emergencySchema);