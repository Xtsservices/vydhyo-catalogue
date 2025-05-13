const express = require('express');
const router = express.Router();
const genderController = require('../Controller/GenderController'); 




// Routes for gender CRUD operations
router.post('/createGender', genderController.createGender);

router.get('/getGenders', genderController.getGenders);
router.put('/updateGender', genderController.updateGender);


module.exports = router;
