const Joi = require('@hapi/joi');

const schemaObject = Joi.object();

function validateGraphQLResponse (data) {
  const v = Joi.validate(data, schemaObject, { stripUnknown: false });
  if (v.error) throw new Error(v.error.message);
  return v.value;
}

function validateGraphQLResponseObject (data) {
  const v = Joi.validate(data, schemaObject, { stripUnknown: false });
  if (v.error) throw new Error(v.error.message);
  return v.value;
}

const schemaArray = Joi.array();

function validateGraphQLResponseArray (data) {
  const v = Joi.validate(data, schemaArray, { stripUnknown: false });
  if (v.error) throw new Error(v.error.message);
  return v.value;
}

module.exports = {
  validateGraphQLResponse,
  validateGraphQLResponseObject,
  validateGraphQLResponseArray
};
