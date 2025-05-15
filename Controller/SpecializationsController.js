const Specializations = require('../Models/Specializations');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  
const specializationJoi = require('../Config/Joi/Specialization');
const GSchema=require('../Models/SequnceSchema')
const GenderSequence=require('../Config/Constant');
const CRUD = new CRUDOperations(Specializations);

exports.createSpecializations = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body cannot be empty' });
  }
const { error } = specializationJoi(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body.aliasName = req.body.name ? req.body.name.toUpperCase() : 'UNKNOWN';
  try { 
    const getSpecialization = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getSpecialization){
     return res.status(400).json({Message:"Specialization Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: GenderSequence.SPECIALIZATION },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.specializationsId = counter.seq;
    req.body.updatedBy = req.body.createdBy

    const createdGender = await CRUD.create(req.body);
    res.status(200).json(createdGender);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSpecializations = async (req, res) => {
  try {
    let obj={}
    if(req.query.specializationsId){
      obj={specializationsId:req.query.specializationsId}
    }
    const specializations = await CRUD.find(obj);
    if(specializations.length<1){
      res.status(400).json({Message:"No Data Found",data:specializations})
 
    }

    res.status(200).json({Message:"Data Fetch Successfully",data:specializations})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Gender by ID
exports.updateGender = async (req, res) => {
  try {
    // Use CRUDOperations class to update gender
    const updatedGender = await CRUD.update(req.body.genderID, req.body);
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
