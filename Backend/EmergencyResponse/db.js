const mongoose = require("mongoose");

const mongoURI  = "mongodb+srv://helloaysha178:f3VoV7PskkOCR4wU@cluster0.pny4dvb.mongodb.net/";
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