const AllergyModel = require('../Models/AllergyModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(AllergyModel);

// Create allergy
exports.createAllergy = async (req, res) => {
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

  
  req.body.aliasName = req.body.name ? req.body.name.trim().toUpperCase() : 'UNKNOWN';

  try { 
    const getDoctorType = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getDoctorType){
     return res.status(400).json({Message:"Allergy Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.ALLERGY },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.allergyId = counter.seq;
    const createAllergy = await CRUD.create(req.body);
    res.status(200).json(createAllergy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All allergy
exports.getAllergy = async (req, res) => {
  try {

    let obj={}
    obj.isActive = 1;
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.allergyId){
      obj.allergyId=req.query.allergyId
    }


    const getAllergy = await CRUD.find(obj);
    if(getAllergy.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:getAllergy})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update allergy by id
exports.updateAllergy = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        allergyId:req.body.allergyId  
      }
      
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }

      req.body.updatedDate=new Date()
    // Use CRUDOperations class to update gender
    const updateAllergy = await CRUD.update({allergyId:req.body.allergyId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:updateAllergy})
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
