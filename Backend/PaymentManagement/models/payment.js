const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoice_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  payment_date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_gateway: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
