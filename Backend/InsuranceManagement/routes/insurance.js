const express = require('express');
const router = express();
const Insurance = require('../models/insurance');

// create a new insurance claim
router.post('/claim/create', async (req, res) => {
  console.log('hit');
  const { policy_number, damage_estimate, repair_cost, status } = req.body;

  // Check if all required fields are present
  if (!policy_number || !damage_estimate || !repair_cost || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Perform additional validations as per your requirements
  if (typeof policy_number !== 'string' || policy_number.trim() === '') {
    return res.status(400).json({ error: 'Invalid policy number' });
  }

  if (typeof damage_estimate !== 'number' || damage_estimate <= 0) {
    return res.status(400).json({ error: 'Invalid damage estimate' });
  }

  if (typeof repair_cost !== 'number' || repair_cost <= 0) {
    return res.status(400).json({ error: 'Invalid repair cost' });
  }

  if (typeof status !== 'string' || !['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    // Save the payment to the database
    const newClaim = await Insurance.create({
      policy_number,
      damage_estimate,
      repair_cost,
      status
    });

    res.status(201).json(newClaim);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to create insurance claim' });
  }
});

// get all insurance claims data
router.get('/claim/all', async (req, res) => {
  try {
    // Fetch all claims from the database
    const claims = await Insurance.find();

    res.status(200).json(claims);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve insurance claims' });
  }
});

// get claim by policy number
router.get('/claim/get/:policy_number', async (req, res) => {
  //console.log('hello world!');
  const { policy_number } = req.params;
  //console.log(policy_number);
  try {
    // Fetch claim data by policy number from the database
    const claim = await Insurance.findOne({ policy_number });
    console.log(claim);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    res.status(200).json(claim);
  } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: 'Failed to retrieve claim data' });
  }
});

// update insurance claim data
router.put('/claim/update/:claim_id', async (req, res) => {
  const claimId = req.params.claim_id;
  const { damage_estimate, repair_cost, status } = req.body;

  try {
    // Find the claim by ID
    const claim = await Insurance.findById(claimId);

    // Check if the claim exists
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    // Update the claim fields
    if( damage_estimate != null ){
      claim.damage_estimate = damage_estimate;
    }
    if( repair_cost != null ){
      claim.repair_cost = repair_cost;
    }
    if( status != null ){
      claim.status = status;
    }


    // Save the updated claim to the database
    await claim.save();

    res.status(200).json({ message: 'Claim updated successfully' });
  } catch (error) {
    console.error('Failed to update the claim', error);
    res.status(500).json({ error: 'Failed to update claim' });
  }
});


// delete claim data
router.delete('/claim/delete/:policy_number', async (req, res) => {
  const policyNumber = req.params.policy_number;

  try {
    // Find and delete the claim by policy number
    const deletedClaim = await Insurance.findOneAndDelete({ policy_number: policyNumber });

    // Check if the claim was found and deleted
    if (!deletedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    res.status(200).json({ message: 'Claim deleted successfully' });
  } catch (error) {
    console.error('Failed to delete the claim', error);
    res.status(500).json({ error: 'Failed to delete claim' });
  }
});


module.exports = router;