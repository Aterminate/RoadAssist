const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, required: true},
    address:{type: String},
    driver_id: {type: String, required: true},
    status: { type: Boolean, default:true}
});

// Hash the user password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });

  // Compare the user password with the provided password
  userSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  };

module.exports = mongoose.model("User", userSchema);