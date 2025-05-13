const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/PermissionController'); 

router.post('/createPermission', _Controller.createPermission);
router.get('/getPermission', _Controller.getPermission);
router.put('/updatePermission', _Controller.updatePermission);


module.exports = router;
