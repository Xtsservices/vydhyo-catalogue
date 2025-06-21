const BloodGroupModel = require('../Models/BLoodGroupModel');


const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(BloodGroupModel);

exports.createBloodGroup = async (req, res) => {
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
    const getData = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getData){
     return res.status(400).json({Message:"BloodGroup Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.BLOODGROUP },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.bloodGroupId = counter.seq;
    const createBloodGroup = await CRUD.create(req.body);
    res.status(200).json(createBloodGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Genders
exports.getBloodGroup = async (req, res) => {
  try {
    let obj = {};
    obj.isActive = 1;

    if (req.query.isActive) {
      obj.isActive = Number(req.query.isActive); 
    }

    if (req.query.bloodGroupId) {
      obj.bloodGroupId = req.query.bloodGroupId;
    }

    const bloodGroup = await CRUD.find(obj);

    if (bloodGroup.length < 1) {
      return res.status(400).json({ Message: "No Data Found" });
    }

    return res.status(200).json({
      Message: "Data Fetch Successfully",
      data: bloodGroup,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// Update Gender by ID
exports.updateBloodGroup = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        bloodGroupId:req.body.bloodGroupId 

      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }

      req.body.updatedDate=new Date()

    // Use CRUDOperations class to update gender
    const updateBloodGroup = await CRUD.update({bloodGroupId:req.body.bloodGroupId}, req.body);
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
