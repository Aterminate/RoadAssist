const mongoose = require('mongoose');

// Define the Invoice schema
const invoiceSchema = new mongoose.Schema({
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Invoice model
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Export the Invoice model
module.exports = Invoice;
