const express = require('express');
const router  = express.Router();
const Vehicle = require('../models/vehicle');
const Repair  = require('../models/repair');

// create a new repair
router.post('/repair/create', async (req, res) => {
  const { vehicle_id, repair_type, repair_cost, maintenance_schedule } = req.body;

  // Check if all required fields are present
  if (!vehicle_id || !repair_type || !repair_cost || !maintenance_schedule) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Fetch the vehicle by ID
    const vehicle = await Vehicle.findById(vehicle_id);

    // Check if the vehicle exists
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Create a new repair record
    const newRepair = await Repair.create({
      vehicle: vehicle._id,
      repair_type,
      repair_cost,
      maintenance_schedule
    });

    res.status(201).json(newRepair);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to create repair record' });
  }
});

// get all repair records
router.get('/repair/all', async (req, res) => {
  try {
    // Fetch all repair records from the database
    const repairs = await Repair.find().populate('vehicle');

    res.status(200).json(repairs);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve repair records' });
  }
});

// get repair record by ID
router.get('/repair/get/:repair_id', async (req, res) => {
  const repairId = req.params.repair_id;

  try {
    // Fetch repair record data by ID from the database
    const repair = await Repair.findById(repairId).populate('vehicle');
    console.log(repair);
    if (!repair) {
      return res.status(404).json({ error: 'Repair record not found' });
    }

    res.status(200).json(repair);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve repair record data' });
  }
});

// update repair record data
router.put('/repair/update/:repair_id', async (req, res) => {
  const repairId = req.params.repair_id;
  const { repair_type, repair_cost, maintenance_schedule } = req.body;

  try {
    // Find the repair record by ID
    const repair = await Repair.findById(repairId);

    // Check if the repair record exists
    if (!repair) {
      return res.status(404).json({ error: 'Repair record not found' });
    }

    // Update the repair record fields
    if (repair_type != null) {
      repair.repair_type = repair_type;
    }
    if (repair_cost != null) {
      repair.repair_cost = repair_cost;
    }
    if (maintenance_schedule != null) {
      repair.maintenance_schedule = maintenance_schedule;
    }

    // Save the updated repair record to the database
    await repair.save();

    res.status(200).json({ message: 'Repair record updated successfully' });
  } catch (error) {
    console.error('Failed to update the repair record', error);
    res.status(500).json({ error: 'Failed to update repair record' });
  }
});

// delete repair record
router.delete('/repair/delete/:repair_id', async (req, res) => {
  const repairId = req.params.repair_id;

  try {
    // Find and delete the repair record by ID
    const deletedRepair = await Repair.findByIdAndDelete(repairId);

    // Check if the repair record was found and deleted
    if (!deletedRepair) {
      return res.status(404).json({ error: 'Repair record not found' });
    }

    res.status(200).json({ message: 'Repair record deleted successfully' });
  } catch (error) {
    console.error('Failed to delete the repair record', error);
    res.status(500).json({ error: 'Failed to delete repair record' });
  }
});
module.exports = router;