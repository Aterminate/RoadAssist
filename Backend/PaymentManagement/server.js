const express = require('express');
const connectDB = require("./db");
const axios = require('axios');
const app = express();
const port = 8084;
/* Adding routes for user */
const invoiceRoutes = require("./routes/invoice");
const paymentRoutes = require("./routes/payment");
// Connect to the database
connectDB();

// Express middleware to parse JSON
app.use(express.json());

// Routes
app.use("/invoice", invoiceRoutes);
app.use("/payment", paymentRoutes);

// Make a request to the microservice
app.get("/microservice", async (req, res) => {
    console.log('hello call');
    try {
    const response = await axios.get("http://localhost:8081/users/getdriver/701");
    console.log('Response:', response.data); // Log the received data
    res.json(response.data);
    } catch (error) {
    console.error('Error:', error); // Log the error object
    res.status(500).json({ error: "Failed to retrieve data from microservice" });
    }
});

app.listen(port, ()=> {
    console.log('Payment Manaegment Service running on port 8084');
})