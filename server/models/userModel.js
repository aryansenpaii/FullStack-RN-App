const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add a valid Email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please type your password"],
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
