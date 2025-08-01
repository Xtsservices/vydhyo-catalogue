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
    type: Number,
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
  }  
});

module.exports = mongoose.model("Degree", DegreeSchema);
