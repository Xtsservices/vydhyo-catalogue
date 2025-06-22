const Joi = require("joi");

const specializationValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().messages({
    "string.base": '"name" should be a type of string',
    "string.empty": '"name" cannot be empty',
    "string.min": '"name" should have a minimum length of 3 characters',
    "string.max": '"name" should have a maximum length of 50 characters',
    "any.required": '"name" is a required field',
  }),

  createdTime: Joi.date().optional(),
  updatedTime: Joi.date().optional(),
});

const validateSpecialization = (data) => {
  return specializationValidationSchema.validate(data);
};

module.exports = validateSpecialization;
