const Joi = require('joi');

const genderValidationSchema = Joi.object({
  type: Joi.string()
    .required()
    .min(3)
    .max(50)
    .trim()
    .messages({
      'string.base': '"name" should be a type of string',
      'string.empty': '"name" cannot be empty',
      'string.min': '"name" should have a minimum length of 3 characters',
      'string.max': '"name" should have a maximum length of 50 characters',
      'any.required': '"name" is a required field',
    }),
  createdBy: Joi.string()
    .required()
    .messages({
      'string.base': '"createdBy" should be a type of string',
      'string.empty': '"createdBy" cannot be empty',
      'any.required': '"createdBy" is a required field',
    }),
    updatedBy: Joi.string()
    .required()
    .messages({
      'string.base': '"updatedBy" should be a type of string',
      'string.empty': '"updatedBy" cannot be empty',
      'any.required': '"updatedBy" is a required field',
    }),
  updatedTime: Joi.date().default(Date.now), // Default the updatedTime if not provided
})
  .min(1)
  .messages({
    'object.min': 'Request body cannot be empty, please provide data',
  });

const validateGender = (data) => {
  return genderValidationSchema.validate(data);
};

module.exports = validateGender;
