const mongoose = require("mongoose");

const mongoURI  = "mongodb+srv://helloaysha178:vrYfACh42ZVz4vjP@cluster0.pqmbc17.mongodb.net/";
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