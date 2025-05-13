const express = require('express');
const router = express.Router();
const degreeController = require('../Controller/DegreeController'); 

// Routes for gender CRUD operations
router.post('/createDegree', degreeController.createDegree);
router.get('/getDegree', degreeController.getDegree);
router.put('/updateDegree', degreeController.updateDegree);


module.exports = router;
