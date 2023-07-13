const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const Repair = require('../models/repair');
const VehicleOwner = require('../models/vehicleowner');

// create a new vehicle owner
router.post('/vehicle-owner/create', async (req, res) => {
  const { user, vehicle } = req.body;

  // Check if all required fields are present
  if (!user || !vehicle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new vehicle owner record
    const newVehicleOwner = await VehicleOwner.create({
      user: user,
      vehicle: vehicle
    });

    res.status(201).json(newVehicleOwner);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to create vehicle owner record' });
  }
});

// get all vehicle owners
router.get('/vehicle-owner/all', async (req, res) => {
  try {
    // Fetch all vehicle owner records from the database
    const vehicleOwners = await VehicleOwner.find().populate('user vehicle');

    res.status(200).json(vehicleOwners);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve vehicle owner records' });
  }
});
// get vehicle owner by ID
/* router.get('/vehicle-owner/get/:vehicle_owner_id', async (req, res) => {
  const vehicleOwnerId = req.params.vehicle_owner_id;

  try {
    // Fetch vehicle owner record by ID from the database
    const vehicleOwner = await VehicleOwner.findById(vehicleOwnerId).populate('user vehicle');

    if (!vehicleOwner) {
      return res.status(404).json({ error: 'Vehicle owner record not found' });
    }

    res.status(200).json(vehicleOwner);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve vehicle owner record data' });
  }
}); */

router.get('/vehicle-owner/get/', async (req, res) => {

  const { user: userId, vehicle: userVehicle } = req.query; // Rename the variable 'email' to 'userEmail'

  let vehicleOwner;

  console.log(userId);
  console.log(userVehicle);

  try {
    console.log("inside current vehicle ");

    if (userId) {
      // Retrieve the user from the database by userId
      vehicleOwner = await VehicleOwner.findOne({ user: userId });
    } else if (userVehicle) {
      // Retrieve the user from the database by email
      vehicleOwner = await VehicleOwner.findOne({ vehicle: userVehicle }); // Use the renamed variable 'userVehicle'
    } else {
      return res.status(400).json({ error: 'Missing parameter: userId or uservehicle' });
    }

    // Check if the vehicle exists
    if (!vehicleOwner) {
      return res.json(null);;
    }

    // Extract the required user information
    const { _id, user, vehicle } = vehicleOwner;

    // Send the response with the user information
    res.json(vehicleOwner);
  } catch (error) {
    console.error('Error retrieving vehicle info :', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving' });
  }
});

// update vehicle owner record data
router.put('/vehicle-owner/update/:vehicle_owner_id', async (req, res) => {
  const vehicleOwnerId = req.params.vehicle_owner_id;
  const { userId, vehicleId } = req.body;

  try {
    // Find the vehicle owner record by ID
    const vehicleOwner = await VehicleOwner.findById(vehicleOwnerId);

    // Check if the vehicle owner record exists
    if (!vehicleOwner) {
      return res.status(404).json({ error: 'Vehicle owner record not found' });
    }

    // Update the vehicle owner record fields
    if (userId != null) {
      vehicleOwner.user = userId;
    }
    if (vehicleId != null) {
      vehicleOwner.vehicle = vehicleId;
    }

    // Save the updated vehicle owner record to the database
    await vehicleOwner.save();

    res.status(200).json({ message: 'Vehicle owner record updated successfully' });
  } catch (error) {
    console.error('Failed to update the vehicle owner record', error);
    res.status(500).json({ error: 'Failed to update vehicle owner record' });
  }
});
// delete vehicle owner record
router.delete('/vehicle-owner/delete/:vehicle_owner_id', async (req, res) => {
  const vehicleOwnerId = req.params.vehicle_owner_id;

  try {
    // Find and delete the vehicle owner record by ID
    const deletedVehicleOwner = await VehicleOwner.findByIdAndDelete(vehicleOwnerId);

    // Check if the vehicle owner record was found and deleted
    if (!deletedVehicleOwner) {
      return res.status(404).json({ error: 'Vehicle owner record not found' });
    }

    res.status(200).json({ message: 'Vehicle owner record deleted successfully' });
  } catch (error) {
    console.error('Failed to delete the vehicle owner record', error);
    res.status(500).json({ error: 'Failed to delete vehicle owner record' });
  }
});
module.exports = router;