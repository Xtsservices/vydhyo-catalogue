const PermissionModel = require('../Models/PermissionModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(PermissionModel);

exports.createPermission = async (req, res) => {
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body cannot be empty' });
  }
  
  const requiredParams={
    featureId:req.body.featureId,
    RoleId:req.body.RoleId 
  }

  for (const [key, value] of Object.entries(requiredParams)) {
    if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
      return res.status(400).json({ message: `${key} is required and cannot be empty` });
    }
  }
  req.body.aliasName = req.body.name ? req.body.name.trim().toUpperCase() : 'UNKNOWN';
  try { 
    const Permission = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(Permission){
     return res.status(400).json({Message:"Permission Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.PERMISSION },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.permissionId = counter.seq;
    const PermissionData = await CRUD.create(req.body);
    res.status(200).json(PermissionData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All allergy
exports.getPermission = async (req, res) => {
  try {

    let obj={}
    obj.isActive=1

    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.permissionId){
      obj.permissionId=req.query.permissionId
    }
    const Permission = await CRUD.find(obj);
    if(Permission.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:Permission})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        permissionId:req.body.permissionId 

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    const Permission = await CRUD.update({permissionId:req.body.permissionId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:Permission})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Gender by ID
exports.deleteGender = async (req, res) => {
  try {
    // Use CRUDOperations class to delete gender by ID
    const response = await CRUD.delete(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
