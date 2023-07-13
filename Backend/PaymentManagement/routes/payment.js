const express = require('express');
const router  = express.Router();
const axios   = require('axios');
const Payment = require('../models/payment');
const Invoice = require('../models/invoice');

// Create a new payment
router.post('/', async (req, res) => {
  const { invoice_id, payment_date, amount, payment_gateway, transaction_id } = req.body;

  try {
    // Check if the invoice exists
    const invoice = await Invoice.findOne({ _id: invoice_id });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Save the payment to the database
    const newPayment = await Payment.create({
      invoice_id: invoice._id,
      payment_date,
      amount,
      payment_gateway,
      transaction_id,
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to create payment' });
  }
});
module.exports = router;