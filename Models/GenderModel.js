const mongoose = require("mongoose");

const { required } = require("joi");
// Define Gender Schema
const genderSchema = new mongoose.Schema(
  {
    genderID: {
      type: Number,
      unique: true,
    },
    type: {
      type: String,
      required: true, 
      unique: true, 
      trim: true,
    },
    aliasName: { type: String },
    isActive: { type: Number, default: 1 }, // 0 for inactive, 1 for active
    createdTime: {
      type: Date,
      default: Date.now,
    },
    updatedTime: {
      type: Date,
      default: Date.now,
    },
  }
);

// Create Gender Model
const Gender = mongoose.model("Gender", genderSchema);
module.exports = Gender;
