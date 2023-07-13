const express = require('express');
const connectDB = require("./db");
const axios = require('axios');
const app = express();
const port = 8085;
/* Adding routes for user */
const maintenanceRoutes = require("./routes/repair");
const vehcileRoutes = require("./routes/vehicle");
const vehcileownerRoutes = require("./routes/vehicleowner");

// Connect to the database
connectDB();
// Express middleware to parse JSON
app.use(express.json());

app.use("/maintenance", maintenanceRoutes);
app.use("/", vehcileRoutes);
app.use("/", vehcileownerRoutes);

app.listen(port, ()=> {
    console.log('Maintenance Manaegment Service running on port 8085');
})