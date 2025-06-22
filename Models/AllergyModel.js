const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllergyGroupSchema = new Schema({
  allergyId: {
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
    type: Number,
    default: 1,
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

module.exports = mongoose.model("Allergy", AllergyGroupSchema);
