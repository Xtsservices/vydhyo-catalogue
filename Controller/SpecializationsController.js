const Specializations = require('../Models/Specializations');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  
const specializationJoi = require('../Config/Joi/Specialization');
const GSchema=require('../Models/SequnceSchema')
const Sequence=require('../Config/Constant');
const CRUD = new CRUDOperations(Specializations);

exports.createSpecializations = async (req, res) => {
  console.log("body", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
  }

  // Validate input using Joi
  const { error } = specializationJoi(req.body);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  const imageFile = req.file;
  req.body.aliasName = req.body.name ? req.body.name.toUpperCase() : "UNKNOWN";

  try {
      // Check if specialization already exists
      const getSpecialization = await CRUD.findOne({ aliasName: req.body.aliasName });
      if (getSpecialization) {
          return res.status(400).json({ message: "Specialization Already Exists" });
      }

      // Generate specialization ID from counter
      const counter = await GSchema.findByIdAndUpdate(
          { _id: Sequence.SPECIALIZATION },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
      );

      req.body.specializationsId = counter.seq;
      req.body.updatedBy = req.body.createdBy;

      // Convert image to Base64 format and generate a viewable URL
      // if (imageFile) {
      //     const base64Image = imageFile.buffer.toString("base64");
      //     req.body.image = {
      //         data: base64Image,
      //         contentType: imageFile.mimetype,
      //     };

      //     // Generate an image URL (assuming Express route)
      //     req.body.imageUrl = `${req.protocol}://${req.get('host')}/specializations/image/${counter.seq}`;
      // }

      const createdSpecialization = await CRUD.create(req.body);
      res.status(200).json(createdSpecialization);
  } catch (err) {
      console.error(err);
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
exports.updateSpecializations = async (req, res) => {
  try {
    // Use CRUDOperations class to update gender

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' });
    }
    
    const requiredParams={
      specializationsId:req.body.specializationsId,
      updatedBy:req.body.updatedBy

    }
  
    for (const [key, value] of Object.entries(requiredParams)) {
      if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
        return res.status(400).json({ message: `${key} is required and cannot be empty` });
      }
    }
    req.body.updatedDate=new Date()
    const updatedGender = await CRUD.update({specializationsId:req.body.specializationsId}, req.body);
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
