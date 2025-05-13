const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/FeatureController'); 

router.post('/createFeature', _Controller.createFeature);
router.get('/getFeature', _Controller.getFeature);
router.put('/updateFeature', _Controller.updateFeature);


module.exports = router;
