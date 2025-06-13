const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  specializationsId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  aliasName: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Number,
    default: 1, // 1 = active, 0 = inactive
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: false,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  updatedTime: {
    type: Date,
    default: Date.now,
  },
  image: {
    data: Buffer, 
    contentType: String, 
  },
  imageUrl:{
    type: String,

  }
});

const specializationModel = mongoose.model(
  "specialization",
  specializationSchema
);
module.exports = specializationModel;
