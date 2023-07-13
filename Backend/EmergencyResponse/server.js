const express = require('express');
const connectDB = require('./db');
const emergencyRoutes = require('./routes/emergency');
const axios = require('axios');


const app = express();
const port = 8082;

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Set up middleware
app.use(express.json());

// Set up routes
app.use('/emergencies', emergencyRoutes);


// Make a request to the microservice

app.get("/microservice", async (req, res) => {

    console.log('hello call');

    try {

    const response = await axios.get("http://localhost:8081/users/current/?userId=6491fa3d51a759aa5f647417");

    console.log('Response:', response.data); // Log the received data

    res.json(response.data);

    } catch (error) {

    console.error('Error:', error); // Log the error object

    res.status(500).json({ error: "Failed to retrieve data from microservice" });

    }

});

app.listen(port, ()=> {
    console.log('Emergency Response Service running on port 8082');
})