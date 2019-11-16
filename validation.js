const Joi = require('@hapi/joi');

const validateRegistrationData = (data) => {
    const validationSchema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    return validationSchema.validate(data);
}

module.exports.validateRegistrationData = validateRegistrationData;