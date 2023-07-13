const express = require('express');
const connectDB = require("./db");
const userRoutes = require("./routes/user");

const app = express();
const port = 8081;

// Connect to the database
connectDB();

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Express middleware to parse JSON
app.use(express.json());

// Routes
app.use("/users", userRoutes);


app.listen(port, ()=> {
    console.log('User Manaegment Service running on port 8081');
})