const mongoose = require("mongoose");
const _Schema = new mongoose.Schema(
  {
    departmentID: {
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

const Department = mongoose.model("Department", _Schema);
module.exports = Department;
