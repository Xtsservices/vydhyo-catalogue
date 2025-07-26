const express = require('express');
const router = express.Router();
const degreeController = require('../Controller/DegreeController'); 
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


router.post('/uploadDegrees', upload.single('file'), degreeController.uploadDegrees);

// Routes for gender CRUD operations
router.post('/createDegree', degreeController.createDegree);
router.get('/getDegree', degreeController.getDegree);
router.put('/updateDegree', degreeController.updateDegree);
router.get('/getAllDegrees', degreeController.getAllDegrees);



module.exports = router;
