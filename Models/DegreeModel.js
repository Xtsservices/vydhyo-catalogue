const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
  degreeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  aliasName: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: String,
    required: true,
    default:1
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Degree", DegreeSchema);
