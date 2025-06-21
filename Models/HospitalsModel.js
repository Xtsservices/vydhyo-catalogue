const mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema(
  {
    hospitalID: {
      type: Number,
      unique: true,
    },
    name: {
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

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
