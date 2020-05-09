const Joi = require('@hapi/joi');

const contactSchema = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  message: Joi.required()
});

const registrationSchema = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(6)
    .max(75)
    .required()
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(6)
    .max(75)
    .required()
});


module.exports = {
  contactSchema: contactSchema,
  registrationSchema: registrationSchema,
  loginSchema: loginSchema
}