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
const hospital =require('./Router/HospitalRouter')
const Department=require('./Router/DepartmentRoute')

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});
app.use('/catalogue/gender', genderRouter);
app.use('/catalogue/specialization', specializationRouter);
app.use('/catalogue/degree', degreeRouter);
app.use('/catalogue/doctorType', doctorTypeRouter);
app.use('/catalogue/bloodGroup', bloodGroupRouter);
app.use('/catalogue/allergy',allergyRouter)
app.use('/catalogue/ChronicConditions',ChronicConditionsRouter)
app.use('/catalogue/relationTypes',RelationShipTypesRouter)
app.use('/catalogue/Roles',RolesRouter)
app.use('/catalogue/permission',permissionRoute)
app.use('/catalogue/feature',featureRouter)
app.use('/catalogue/hospital',hospital)
app.use('/catalogue/department',Department)


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
