const Gender = require('../Models/GenderModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const createGenderSchema = require('../Config/Joi/Gender');  // Joi validation schema
const GSchema=require('../Models/SequnceSchema')
const GenderSequence=require('../Config/Constant');
// Create an instance of CRUDOperations for the Gender model
const CRUD = new CRUDOperations(Gender);

// Create Gender
exports.createGender = async (req, res) => {
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body cannot be empty' });
  }
  
  // Validate the request body using Joi schema
  const { error } = createGenderSchema(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Adding a derived value for aliasName
  req.body.aliasName = req.body.type ? req.body.type.toUpperCase() : 'UNKNOWN';

  try { 
    const getGender = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getGender){
     return res.status(400).json({Message:"Gender Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: GenderSequence.GENDER },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.genderID = counter.seq;
    const createdGender = await CRUD.create(req.body);
    res.status(201).json(createdGender);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Genders
exports.getGenders = async (req, res) => {
  try {
    // Use CRUDOperations class to get all genders

    let obj={}
    if(req.query.genderID){
      obj={genderID:req.query.genderID}
    }
    console.log("0-00--",obj)

    const genders = await CRUD.find(obj);
    if(genders.length<1){
      res.status(400).json({Message:"No Data Found",data:genders})
 
    }

    res.status(200).json({Message:"Data Fetch Successfully",data:genders})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Gender by ID
exports.updateGender = async (req, res) => {
  try {

    const requiredParams={
      genderID:req.body.genderID,
      updatedBy:req.body.updatedBy
    }
  
    for (const [key, value] of Object.entries(requiredParams)) {
      if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
        return res.status(400).json({ message: `${key} is required and cannot be empty` });
      }
    }
    req.body.updatedDate=new Date()


    const updatedGender = await CRUD.update({genderID:req.body.genderID}, req.body);
    res.json(updatedGender);
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
