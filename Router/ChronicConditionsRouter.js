const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/ChronicConditionsController'); 

// Routes for gender CRUD operations
router.post('/createChronicConditions', _Controller.createChronicConditions);
router.get('/getChronicConditions', _Controller.getChronicConditions);
router.put('/updateChronicConditions', _Controller.updateChronicConditions);


module.exports = router;
