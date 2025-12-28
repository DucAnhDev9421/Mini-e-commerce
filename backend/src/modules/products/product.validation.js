const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    basePrice: Joi.number().required(),
    stock: Joi.number().required(),
    // Images are handled via upload middleware, but we might validate urls if provided directly
    variants: Joi.array().optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    basePrice: Joi.number().optional(),
    stock: Joi.number().optional()
});

module.exports = {
    createProductSchema,
    updateProductSchema
};
