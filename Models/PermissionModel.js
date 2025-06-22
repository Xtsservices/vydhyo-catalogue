const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionModel = new Schema({
    permissionId: {
    type: Number,
    required: true,
  },
  featureId: {
    type: String,
    required: true,
  },
  RoleId: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
    default:true
  },
  write: {
    type: Boolean,
    required: true,
    default:true


  },
  update: {
    type: Boolean,
    required: true,
    default:true


  },
  delete: {
    type: Boolean,
    required: true,
    default:true


  },
  approve: {
    type: Boolean,
    required: true,
    default:true


  },
  download: {
    type: Boolean,
    required: true,
    default:true


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

  module.exports = mongoose.model("PermissionModel", permissionModel);
