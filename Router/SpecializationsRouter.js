const express = require('express');
const router = express.Router();
const genderController = require('../Controller/SpecializationsController'); 


router.post('/createSpecializations', genderController.createSpecializations);
router.get('/getSpecializations', genderController.getSpecializations);
router.put('/updateSpecializations', genderController.updateSpecializations);

module.exports = router;
