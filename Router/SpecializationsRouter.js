const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/SpecializationsController'); 
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/createSpecializations', upload.single('image'), _Controller.createSpecializations);
router.get('/getSpecializations', _Controller.getSpecializations);
router.put('/updateSpecializations', _Controller.updateSpecializations);

module.exports = router;
