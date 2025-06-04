const _model = require("../Models/HospitalsModel");
const CRUDOperations = require("../ReusableFunction.js/CommanClass");
const Sequence = require("../Models/SequnceSchema");
const _constant = require("../Config/Constant");
// Create an instance of CRUDOperations for the Gender model
const CRUD = new CRUDOperations(_model);

// Create Gender
exports.createHospital = async (req, res) => {
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty" });
  }

  const requiredParams = {
    name: req.body.name,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
  };

  for (const [key, value] of Object.entries(requiredParams)) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return res
        .status(400)
        .json({ message: `${key} is required and cannot be empty` });
    }
  }
  req.body.aliasName = req.body.name
    ? req.body.name.trim().toUpperCase()
    : "UNKNOWN";

  try {
    const existingData = await CRUD.findOne({ aliasName: req.body.aliasName });
    if (existingData) {
      return res.status(400).json({ Message: "Hospital Already Exists" });
    }
    const counter = await Sequence.findByIdAndUpdate(
      { _id: _constant.HOSPITAL },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.hospitalID = counter.seq;
    const createdGender = await CRUD.create(req.body);
   return res.status(201).json(createdGender);
  } catch (err) {
    return   res.status(400).json({ message: err.message });
  }
};

exports.getHospital = async (req, res) => {
  try {
    let obj = {};
    obj.isActive=1
    if (req.query.hospitalID) {
      obj.hospitalID =req.query.hospitalID;
    }
    if (req.query.isActive) {
        obj.isActive = req.query.isActive;
      }

    const checkExisting = await CRUD.find(obj);
    if (checkExisting.length < 1) {
    return  res.status(400).json({ Message: "No Data Found", data: checkExisting });
    }
    return  res
      .status(200)
      .json({ Message: "Data Fetch Successfully", data: checkExisting });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const requiredParams = {
      hospitalID: req.body?.hospitalID,
      updatedBy: req.body?.updatedBy,
    };

    for (const [key, value] of Object.entries(requiredParams)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return res
          .status(400)
          .json({ message: `${key} is required and cannot be empty` });
      }
    }
    req.body.updatedDate = new Date();
    const updatedData = await CRUD.update(
      { hospitalID: req.body.hospitalID },
      req.body
    );
    res.status(200).json(updatedData);
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
