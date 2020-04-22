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

module.exports = contactSchema;