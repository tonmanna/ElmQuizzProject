const Joi = require('@hapi/joi');

const schema = Joi.array().items(
    Joi.object().keys({
        no: Joi.number().required(),
        title: Joi.string().required(),
        answer: Joi.string().required().allow(''),
        code: Joi.string().optional(),
        markdown: Joi.string().optional(),
        marmaid: Joi.string().optional()
    }));

function validate(data) {
    const v = schema.validate(data, {
        stripUnknown: true
    });
    if (v.error) {
        throw new Error(v.error.message);
    }
    return v.value;
}
module.exports = {
    validateResponseQuiz: validate
};
