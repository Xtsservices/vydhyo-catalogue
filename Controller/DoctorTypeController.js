const DoctorTypeModel = require('../Models/DoctorTypeModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(DoctorTypeModel);

// Create 
exports.createDoctorType = async (req, res) => {
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
     return res.status(400).json({Message:"DoctorType Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.DOCTORTYPE },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.doctortypeId = counter.seq;
    const createDoctorType = await CRUD.create(req.body);
   return res.status(200).json(createDoctorType);
  } catch (err) {
    return  res.status(400).json({ message: err.message });
  }
};

exports.getDoctorType = async (req, res) => {
  try {

    let obj={}
    obj.isActive = 1;
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.doctortypeId){
      obj.doctortypeId=req.query.doctortypeId
    }
    const doctortype = await CRUD.find(obj);
    if(doctortype.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:doctortype})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDoctorType = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        doctortypeId:req.body.doctortypeId 

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    // Use CRUDOperations class to update 
    const updatedDoctorType = await CRUD.update({doctortypeId:req.body.doctortypeId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:updatedDoctorType})
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
