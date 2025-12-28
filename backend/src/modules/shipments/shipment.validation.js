const Joi = require('joi');

const createShipment = {
    body: Joi.object().keys({
        orderId: Joi.string().required(),
        carrier: Joi.string().required()
    })
};

const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid('Pending', 'Shipped', 'Delivered', 'Failed').required(),
        note: Joi.string().optional()
    })
};

module.exports = {
    createShipment,
    updateStatus
};
