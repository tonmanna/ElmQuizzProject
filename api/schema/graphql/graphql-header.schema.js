const Joi = require('@hapi/joi');

const headerSchema = Joi.object();

function validateGraphQLHeader (data) {
  const validate = Joi.validate(data, headerSchema, { stripUnknown: false });
  if (validate.error) throw new Error(validate.error.message);
  return validate.value;
}

module.exports = {
  validateGraphQLHeader
};
