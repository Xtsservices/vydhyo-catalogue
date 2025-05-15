const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/BloodGroupController'); 

// Routes for gender CRUD operations
router.post('/createBloodGroup', _Controller.createBloodGroup);
router.get('/getBloodGroup', _Controller.getBloodGroup);
router.put('/updateBloodGroup', _Controller.updateBloodGroup);


module.exports = router;
