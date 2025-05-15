const Joi = require("joi");

const specializationValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().messages({
    "string.base": '"name" should be a type of string',
    "string.empty": '"name" cannot be empty',
    "string.min": '"name" should have a minimum length of 3 characters',
    "string.max": '"name" should have a maximum length of 50 characters',
    "any.required": '"name" is a required field',
  }),

  aliasName: Joi.string().trim().optional().messages({
    "string.base": '"aliasName" should be a type of string',
  }),
  createdBy: Joi.string().required().messages({
    "string.base": '"createdBy" should be a type of string',
    "string.empty": '"createdBy" cannot be empty',
    "any.required": '"createdBy" is a required field',
  }),

  updatedBy: Joi.string().optional().messages({
    "string.base": '"updatedBy" should be a type of string',
    "string.empty": '"createdBy" cannot be empty',
    "any.required": '"createdBy" is a required field',
  }),

  createdTime: Joi.date().optional(),
  updatedTime: Joi.date().optional(),
});

const validateSpecialization = (data) => {
  return specializationValidationSchema.validate(data);
};

module.exports = validateSpecialization;
