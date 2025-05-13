const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/RolesController'); 

router.post('/createRoles', _Controller.createRoles);
router.get('/getRoles', _Controller.getRoles);
router.put('/updateRoles', _Controller.updateRoles);


module.exports = router;
