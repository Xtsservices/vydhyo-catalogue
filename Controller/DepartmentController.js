const _model = require("../Models/DepartmentModel");
const CRUDOperations = require("../ReusableFunction.js/CommanClass");
const Sequence = require("../Models/SequnceSchema");
const _constant = require("../Config/Constant");
// Create an instance of CRUDOperations for the Gender model
const CRUD = new CRUDOperations(_model);

exports.createDepartment = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty" });
  }

  const requiredParams = {
    name: req.body?.name,
    createdBy: req.body?.createdBy,
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
  req.body.aliasName = req.body.name
    ? req.body.name.trim().toUpperCase()
    : "UNKNOWN";

  try {
    const existingData = await CRUD.findOne({ aliasName: req.body.aliasName });
    if (existingData) {
      return res.status(400).json({ Message: "Department Already Exists" });
    }
    const counter = await Sequence.findByIdAndUpdate(
      { _id: _constant.DEPARTMENT },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.departmentID = counter.seq;
    const createdGender = await CRUD.create(req.body);
    return res.status(201).json(createdGender);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    let obj = {};
    obj.isActive = 1;
    if (req.query.departmentID) {
      obj.departmentID = req.query.departmentID;
    }
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }

    const checkExisting = await CRUD.find(obj);
    if (checkExisting.length < 1) {
      return res
        .status(400)
        .json({ Message: "No Data Found", data: checkExisting });
    }
    return res
      .status(200)
      .json({ Message: "Data Fetch Successfully", data: checkExisting });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const requiredParams = {
      departmentID: req.body?.departmentID,
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
      { departmentID: req.body.departmentID },
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
