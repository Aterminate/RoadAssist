const express = require('express');
const connectDB = require("./db");
const axios = require('axios');
const app = express();
const port = 8083;
/* Adding routes for user */
const insuranceRoutes = require("./routes/insurance");
// Connect to the database
connectDB();

// Express middleware to parse JSON
app.use(express.json());

// Routes

app.use("/insurance", insuranceRoutes);

app.listen(port, ()=> {
    console.log('Insurance Manaegment Service running on port 8085');
})