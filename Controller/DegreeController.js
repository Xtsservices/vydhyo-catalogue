const degree = require('../Models/DegreeModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const DegreeSequence=require('../Config/Constant');
const CRUD = new CRUDOperations(degree);

exports.createDegree = async (req, res) => {
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body cannot be empty' });
  }
  
  const requiredParams={
    name:req.body.name 
  }

  for (const [key, value] of Object.entries(requiredParams)) {
    if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
      return res.status(400).json({ message: `${key} is required and cannot be empty` });
    }
  }

  
  req.body.aliasName = req.body.name ? req.body.name.toUpperCase() : 'UNKNOWN';

  try { 
    const getDegree = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getDegree){
     return res.status(400).json({Message:"Degree Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: DegreeSequence.DEGREE },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.degreeId = counter.seq;
    const createDegree = await CRUD.create(req.body);
    res.status(201).json(createDegree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get data 
exports.getDegree = async (req, res) => {
  try {

    let obj={}
    obj.isActive = 1;
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.degreeId){
      obj.degreeId=req.query.degreeId
    }
    const degree = await CRUD.find(obj);
    if(degree.length<1){
      res.status(400).json({Message:"No Data Found",data:degree})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:degree})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update degreee by ID
exports.updateDegree = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        degreeId:req.body.degreeId 
      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    // Use CRUDOperations class to update gender
    const updatedDegree = await CRUD.update({degreeId:req.body.degreeId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:updatedDegree})
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
