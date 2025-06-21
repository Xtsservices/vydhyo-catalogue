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
