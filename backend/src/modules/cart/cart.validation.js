const Joi = require('joi');

const addToCart = {
    body: Joi.object().keys({
        productId: Joi.string().required(),
        variantId: Joi.string().optional(),
        quantity: Joi.number().integer().min(1).required()
    })
};

const updateQty = {
    body: Joi.object().keys({
        productId: Joi.string().required(),
        variantId: Joi.string().optional(),
        quantity: Joi.number().integer().min(1).required()
    })
};

module.exports = {
    addToCart,
    updateQty
};
