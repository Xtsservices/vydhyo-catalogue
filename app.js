require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./DB/Db');
const logger = require('./Config/Logger'); 
const genderRouter = require('./Router/GenderRouter'); 
const specializationRouter = require('./Router/SpecializationsRouter'); 
const degreeRouter=require('./Router/DegreeRouter')
const doctorTypeRouter=require('./Router/DoctorTypeRouter')
const bloodGroupRouter=require('./Router/BloodGroupRouter')
const allergyRouter=require('./Router/AllergyRouter')
const ChronicConditionsRouter=require('./Router/ChronicConditionsRouter')
const RelationShipTypesRouter=require('./Router/RelationshiptypTypesRouter')
const RolesRouter=require('./Router/RolesRouter')
const featureRouter=require('./Router/featureRouter')
const permissionRoute=require('./Router/PermissionRouter')

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});
app.use('/api/gender', genderRouter);
app.use('/api/specialization', specializationRouter);
app.use('/api/degree', degreeRouter);
app.use('/api/doctorType', doctorTypeRouter);
app.use('/api/bloodGroup', bloodGroupRouter);
app.use('/api/allergy',allergyRouter)
app.use('/api/ChronicConditions',ChronicConditionsRouter)
app.use('/api/relationTypes',RelationShipTypesRouter)
app.use('/api/Roles',RolesRouter)
app.use('/api/permission',permissionRoute)
app.use('/api/feature',featureRouter)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
