const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
    RoleId: {
    type: Number,
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

module.exports = mongoose.model("Roles", RolesSchema);
