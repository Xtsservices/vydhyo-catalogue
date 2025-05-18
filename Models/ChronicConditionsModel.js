const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChronicConditionsSchema = new Schema({
  chronicId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aliasName: {
    type: String,
  },
  isActive: {
    type: number,
    default: 1,
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

module.exports = mongoose.model("ChronicConditions", ChronicConditionsSchema);
