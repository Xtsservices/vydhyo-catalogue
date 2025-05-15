const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/DoctorTypeController'); 

// Routes for gender CRUD operations
router.post('/createDoctorType', _Controller.createDoctorType);
router.get('/getDoctorType', _Controller.getDoctorType);
router.put('/updateDoctorType', _Controller.updateDoctorType);


module.exports = router;
