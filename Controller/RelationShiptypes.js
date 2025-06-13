const RelationshipTypesModel = require('../Models/RelationshipTypesModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(RelationshipTypesModel);

// Create
exports.createRelationshipTypes = async (req, res) => {
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
     return res.status(400).json({Message:"RELATIONSHIPTYPES Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.RELATIONSHIPTYPES },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.RelationshipTypeid = counter.seq;
    const createRelationShipType = await CRUD.create(req.body);
    res.status(200).json(createRelationShipType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All 
exports.getRelationshipTypes = async (req, res) => {
  try {

    let obj={}
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.RelationshipTypeid){
      obj.RelationshipTypeid=req.query.RelationshipTypeid
    }
    const RelationshipType = await CRUD.find(obj);
    if(RelationshipType.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:RelationshipType})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update  by id
exports.updateRelationshipTypes = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        RelationshipTypeid:req.body.RelationshipTypeid,
        updatedBy:req.body.updatedBy

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    const RelationshipType = await CRUD.update({RelationshipTypeid:req.body.RelationshipTypeid}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:RelationshipType})
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
