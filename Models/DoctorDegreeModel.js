const mongoose = require('mongoose');

const doctorDegreeSchema = new mongoose.Schema({
  degreeId: { type: String, unique: true, required: true }, // Unique identifier (e.g., DEG001)
  degreeName: { type: String, required: true }, // e.g., MBBS, MD
  description: { type: String }, // Optional description
  createdAt: { type: Date, default: Date.now },
});

const Degree = mongoose.model('DoctorDegree', doctorDegreeSchema);
module.exports = Degree;