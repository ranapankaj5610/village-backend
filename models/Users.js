const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // password: { type: String, required: true },
  description: { type: String },
  //dateOfBirth: { type: Date },
  profilePicture: { data: Buffer, contentType: String },
  //resume: { data: Buffer, contentType: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
