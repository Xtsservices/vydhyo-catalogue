const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/DepartmentController'); 

router.post('/createDepartment', _Controller.createDepartment);
router.get('/getDepartment', _Controller.getDepartment);
router.put('/updateDepartment', _Controller.updateDepartment);


module.exports = router;
