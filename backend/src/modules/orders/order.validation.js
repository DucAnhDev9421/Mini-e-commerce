const Joi = require('joi');

const createOrder = {
    body: Joi.object().keys({
        shippingAddress: Joi.string().required(),
        paymentMethod: Joi.string().valid('COD', 'Online').required()
        // Items are taken from cart, so no need to validate items array here usually
    })
};

const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled').required()
    })
};

module.exports = {
    createOrder,
    updateStatus
};
