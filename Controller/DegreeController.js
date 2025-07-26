const degree = require('../Models/DegreeModel');
const CRUDOperations = require('../ReusableFunction.js/CommanClass');  // Import CRUDOperations class
const GSchema=require('../Models/SequnceSchema')
const DegreeSequence=require('../Config/Constant');
const CRUD = new CRUDOperations(degree);
const DoctorDegreeModel = require('../Models/DoctorDegreeModel');
const Counter = require('../Sequence/DoctorDegreeSequence');
const PREFIX_SEQUENCE = require('../utils/constant');
const XLSX = require('xlsx'); // Add this import

exports.createDegree = async (req, res) => {
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

  
  req.body.aliasName = req.body.name ? req.body.name.toUpperCase() : 'UNKNOWN';

  try { 
    const getDegree = await CRUD.findOne({"aliasName":req.body.aliasName});
    if(getDegree){
     return res.status(400).json({Message:"Degree Already Exists"})
    }
    const counter = await GSchema.findByIdAndUpdate(
      { _id: DegreeSequence.DEGREE },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.degreeId = counter.seq;
    const createDegree = await CRUD.create(req.body);
    res.status(201).json(createDegree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get data 
exports.getDegree = async (req, res) => {
  try {

    let obj={}
    obj.isActive = 1;
    if (req.query.isActive) {
      obj.isActive = req.query.isActive;
    }
    if(req.query.degreeId){
      obj.degreeId=req.query.degreeId
    }
    const degree = await CRUD.find(obj);
    if(degree.length<1){
      res.status(400).json({Message:"No Data Found",data:degree})
 
    }
    res.status(200).json({Message:"Data Fetch Successfully",data:degree})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update degreee by ID
exports.updateDegree = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
      }
      
      const requiredParams={
        degreeId:req.body.degreeId 
      }
    
      for (const [key, value] of Object.entries(requiredParams)) {
        if (value === undefined || value === null ||   (typeof value === 'string' && value.trim() === '')) {
          return res.status(400).json({ message: `${key} is required and cannot be empty` });
        }
      }
      req.body.updatedDate=new Date()

    // Use CRUDOperations class to update gender
    const updatedDegree = await CRUD.update({degreeId:req.body.degreeId}, req.body);
    res.status(200).json({Message:"Data Updated Successfully",data:updatedDegree})
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

async function getNextSequenceValue(sequenceName) {
    const counter = await Counter.findByIdAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return `${PREFIX_SEQUENCE.DOCTOR_DEGREE_SEQUENCE.SEQUENCE}${counter.seq.toString().padStart(4, '0')}`;
}

exports.uploadDegrees = async (req, res) => {
   console.log('uploadDegrees endpoint hit');
    try {
        // Ensure MongoDB connection is established

console.log("first")
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
console.log("first3")

        // Read the Excel file from buffer (multer memory storage)
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON, mapping "Course Name" to "degreeName"
        const data = XLSX.utils.sheet_to_json(sheet, { header: ['slNo', 'degreeName'] });
console.log("firdatast==",data)

        if (!data || data.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data found in Excel file'
            });
        }

        // Prepare data for insertion
        const degreesToInsert = [];
        for (const row of data) {
            // Validate required fields
            if (!row.degreeName) {
                console.warn(`Skipping row with missing degreeName: ${JSON.stringify(row)}`);
                continue;
            }

            // Generate unique degreeId for each degree
            const degreeId = await getNextSequenceValue(PREFIX_SEQUENCE.DOCTOR_DEGREE_SEQUENCE.DOCTOR_MODEL);

            degreesToInsert.push({
                degreeId,
                degreeName: row.degreeName.trim(),
                description: '', // No description in Excel, default to empty string
                createdAt: new Date()
            });
        }

        // Insert data into MongoDB
        if (degreesToInsert.length > 0) {
            const result = await DoctorDegreeModel.insertMany(degreesToInsert, { ordered: false });
            return res.status(200).json({
                success: true,
                message: `${result.length} degrees inserted successfully`,
                data: result
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No valid data found to insert'
            });
        }

    } catch (error) {
        console.error('Error uploading degrees:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to upload degrees',
            error: error.message
        });
    }
};

exports.getAllDegrees = async (req, res) => {
  try {
    const degrees = await DoctorDegreeModel.find({} );
    if (degrees.length < 1) {
      return res.status(400).json({ Message: "No Data Found", data: degrees });
    }
    res.status(200).json({ Message: "Data Fetch Successfully", data: degrees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};