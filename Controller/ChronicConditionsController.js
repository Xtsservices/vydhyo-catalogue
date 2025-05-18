const ChronicConditionsModel = require('../Models/ChronicConditionsModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(ChronicConditionsModel);

// Create allergy
exports.createChronicConditions = async (req, res) => {
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
    const chronic = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(chronic){
     return res.status(400).json({Message:"chronic Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.CHRONICCONDITION },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.chronicId = counter.seq;
    const createBloodGroup = await CRUD.create(req.body);
    res.status(200).json(createBloodGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All allergy
exports.getChronicConditions = async (req, res) => {
  try {

    let obj={}
    if(req.query.chronicId){
      obj={chronicId:req.query.chronicId}
    }
    const chronicData = await CRUD.find(obj);
    if(chronicData.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:chronicData})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update allergy by id
exports.updateChronicConditions = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        chronicId:req.body.chronicId,
        updatedBy:req.body.updatedBy

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    const updateBloodGroup = await CRUD.update({chronicId:req.body.chronicId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:updateBloodGroup})
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
