const Joi = require('@hapi/joi');

const schema = Joi.object();

function validateGraphQLArgument (data) {
  const validate = Joi.validate(data, schema, { stripUnknown: false });
  if (validate.error) throw new Error(validate.error.message);
  return validate.value;
}

module.exports = {
  validateGraphQLArgument
};
