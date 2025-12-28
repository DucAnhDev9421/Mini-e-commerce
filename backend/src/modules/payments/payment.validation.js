const Joi = require('joi');

const initiatePayment = {
    body: Joi.object().keys({
        orderId: Joi.string().required(),
        paymentMethod: Joi.string().valid('COD', 'MoMo').required()
    })
};

module.exports = {
    initiatePayment
};
