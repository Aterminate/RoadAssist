const express = require('express');
const router  = express.Router();
const Vehicle = require('../models/vehicle');
const Repair  = require('../models/repair');

// create a new vehicle
router.post('/vehicle/create', async (req, res) => {
  const { make, model, year } = req.body;

  // Check if all required fields are present
  if (!make || !model || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new vehicle record
    const newVehicle = await Vehicle.create({
      make,
      model,
      year
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to create vehicle record' });
  }
});

// get all vehicle records
router.get('/vehicle/all', async (req, res) => {
  try {
    // Fetch all vehicle records from the database
    const vehicles = await Vehicle.find();

    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve vehicle records' });
  }
});

// get vehicle record by ID
router.get('/vehicle/get/:vehicle_id', async (req, res) => {
  const vehicleId = req.params.vehicle_id;

  try {
    // Fetch vehicle record data by ID from the database
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle record not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve vehicle record data' });
  }
});

// update vehicle record data
router.put('/vehicle/update/:vehicle_id', async (req, res) => {
  const vehicleId = req.params.vehicle_id;
  const { make, model, year } = req.body;

  try {
    // Find the vehicle record by ID
    const vehicle = await Vehicle.findById(vehicleId);

    // Check if the vehicle record exists
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle record not found' });
    }

    // Update the vehicle record fields
    if (make != null) {
      vehicle.make = make;
    }
    if (model != null) {
      vehicle.model = model;
    }
    if (year != null) {
      vehicle.year = year;
    }

    // Save the updated vehicle record to the database
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle record updated successfully' });
  } catch (error) {
    console.error('Failed to update the vehicle record', error);
    res.status(500).json({ error: 'Failed to update vehicle record' });
  }
});

// delete vehicle record
router.delete('/vehicle/delete/:vehicle_id', async (req, res) => {
  const vehicleId = req.params.vehicle_id;

  try {
    // Find and delete the vehicle record by ID
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    // Check if the vehicle record was found and deleted
    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle record not found' });
    }

    res.status(200).json({ message: 'Vehicle record deleted successfully' });
  } catch (error) {
    console.error('Failed to delete the vehicle record', error);
    res.status(500).json({ error: 'Failed to delete vehicle record' });
  }
});

module.exports = router;
