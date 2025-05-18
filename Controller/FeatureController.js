const featureModel = require('../Models/FeaturesModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(featureModel);

exports.createFeature = async (req, res) => {
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
    const Feature = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(Feature){
     return res.status(400).json({Message:"Role Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: Sequence.FEATURE },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.featureId = counter.seq;
    const createRelationShipType = await CRUD.create(req.body);
    res.status(200).json(createRelationShipType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getFeature = async (req, res) => {
  try {

    let obj={}
    if(req.query.featureId){
      obj={featureId:req.query.featureId}
    }
    const feature = await CRUD.find(obj);
    if(feature.length<1){
      res.status(400).json({Message:"No Data Found"})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:feature})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
    }
      const requiredParams={
        featureId:req.body.featureId,
        updatedBy:req.body.updatedBy
      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    const feature = await CRUD.update({featureId:req.body.featureId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:feature})
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
