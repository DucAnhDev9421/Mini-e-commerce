const Joi = require('joi');

const adjustStock = {
    body: Joi.object().keys({
        productId: Joi.string().required(),
        variantId: Joi.string().optional(),
        type: Joi.string().valid('IN', 'OUT').required(),
        quantity: Joi.number().integer().min(1).required(),
        reason: Joi.string().required(),
        reference: Joi.string().optional()
    })
};

module.exports = {
    adjustStock
};
