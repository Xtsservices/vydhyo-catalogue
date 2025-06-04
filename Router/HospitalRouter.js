const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/HospitalController'); 

// Routes for gender CRUD operations
router.post('/createHospital', _Controller.createHospital);
router.get('/getHospital', _Controller.getHospital);
router.put('/updateHospital', _Controller.updateHospital);


module.exports = router;
