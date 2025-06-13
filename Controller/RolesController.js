const RolesModel = require('../Models/RolesModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(RolesModel);

exports.createRoles = async (req, res) => {
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body cannot be empty' });
  }
  
  const requiredParams={
    name:req.body.name,
    createdBy:req.body.createdBy,
    updatedBy:req.body.updatedBy
  }

  for (const [key, value] of Object.entries(requiredParams)) {
    if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
      return res.status(400).json({ message: `${key} is required and cannot be empty` });
    }
  }
  req.body.aliasName = req.body.name ? req.body.name.trim().toUpperCase() : 'UNKNOWN';
  try { 
    const RelationShip = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(RelationShip){
     return res.status(400).json({Message:"Role Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.ROLES },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.RoleId = counter.seq;
    const createRelationShipType = await CRUD.create(req.body);
    res.status(200).json(createRelationShipType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All
exports.getRoles = async (req, res) => {
  try {

    let obj={}
    
    if(req.query.RoleId){
      obj={RoleId:req.query.RoleId}
    }
    const role = await CRUD.find(obj);
    if(role.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:role})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update allergy by id
exports.updateRoles = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        RoleId:req.body.RoleId,
        updatedBy:req.body.updatedBy

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    const Role = await CRUD.update({RoleId:req.body.RoleId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:Role})
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
