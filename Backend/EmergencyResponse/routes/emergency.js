const express = require('express');
const axios = require('axios');
const router = express.Router();
const EmergencyModel = require('../models/emergency');

// Create a new emergency
router.post('/create', async (req, res) => {
  try {
    console.log("get emergency");
    const { userId } = req.query;
    console.log("get emergency user: ", userId);

    const { callerName, phoneNumber, emergencyType, location } = req.body;

    // Make a request to User Management service to retrieve user information
   const response = await axios.get(`http://localhost:8081/users/current/?userId=${userId}`);

    console.log("response :", response.data);

    // res.json(response.data);


    const emergency = await EmergencyModel.create({

      callerName,
      phoneNumber,
      emergencyType,
      location

    });
    console.log("hiiiiiiiiiiiiiiiiii emergency: ", emergency);

    res.status(201).json({
      message: 'Emergency created successfully'
    });

  } catch (error) {
    console.error('Error creating emergency:', error.message);
    res.status(500).json({
      error: 'An error occurred while creating the emergency'
    });
  }

});
// test
router.get('/', async (req, res) => {
  console.log("Emergency response get api ");
});
module.exports = router;