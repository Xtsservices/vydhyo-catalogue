const express = require('express');
const router = express.Router();
const _Controller = require('../Controller/RelationShiptypes'); 

// Routes for gender CRUD operations
router.post('/createRelationshipTypes', _Controller.createRelationshipTypes);
router.get('/getRelationshipTypes', _Controller.getRelationshipTypes);
router.put('/updateRelationshipTypes', _Controller.updateRelationshipTypes);


module.exports = router;
