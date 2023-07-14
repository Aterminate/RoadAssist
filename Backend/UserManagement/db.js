const mongoose = require("mongoose");

const mongoURI  = "mongodb+srv://helloaysha178:5PVkXH8qI9J2XP9M@cluster0.iqyxokb.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;