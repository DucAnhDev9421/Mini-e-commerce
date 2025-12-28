const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    // Schema can have keys: body, query, params
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    // Compile schema and validate
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        // Pass error to global error handler
        return next(error);
    }

    // Update req with validated value (coerced types etc)
    Object.assign(req, value);
    return next();
};

// Helper function to pick keys from object
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = validate;
