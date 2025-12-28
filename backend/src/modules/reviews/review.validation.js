const Joi = require('joi');

const addReview = {
    body: Joi.object().keys({
        productId: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    })
};

module.exports = {
    addReview
};
