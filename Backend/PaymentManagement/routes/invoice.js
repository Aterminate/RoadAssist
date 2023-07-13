const express  = require('express');
const router   = express.Router();
const axios    = require('axios');
const Invoice  = require('../models/invoice');

// create a new invoice
router.post("/", async (req, res) => {

  const { id } = req.query;
  console.log(id);
     try {
        const response = await axios.get(`http://localhost:8081/users/getdriver/${id}`);
          const driverId = response.data._id; // Access the _id property from the response data
          // Extract the invoice details from the request body
          const { description, amount, status } = req.body;
          // Create a new invoice object
          const invoice = new Invoice({
            driver_id: driverId,
            description,
            amount,
            status,
          });
          // Save the invoice to the database
          const newInvoice = await invoice.save();
          res.status(201).json(newInvoice);
          } catch (error) {
      console.error('Error:', error); // Log the error object
      res.status(500).json({ error: "Failed to retrieve data from microservice" });
      }
});
module.exports = router;