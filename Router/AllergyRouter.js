const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/AllergyController'); 

// Routes for gender CRUD operations
router.post('/createAllergy', _Controller.createAllergy);
router.get('/getAllergy', _Controller.getAllergy);
router.put('/updateAllergy', _Controller.updateAllergy);


module.exports = router;
