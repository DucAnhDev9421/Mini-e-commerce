const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    basePrice: Joi.number().required(),
    stock: Joi.number().required(),
    // Images are handled via upload middleware, but we might validate urls if provided directly
    variants: Joi.array().optional(),
    // Thông tin xuất xứ
    origin: Joi.object({
        province: Joi.string().optional(),
        district: Joi.string().optional(),
        region: Joi.string().valid('Bắc', 'Trung', 'Nam', 'Tây Nguyên', 'Đồng bằng sông Cửu Long').optional(),
        address: Joi.string().optional()
    }).optional(),
    // Thông tin nhà sản xuất
    producer: Joi.object({
        name: Joi.string().optional(),
        address: Joi.string().optional(),
        contact: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional()
    }).optional(),
    // Chứng nhận
    certification: Joi.array().items(
        Joi.string().valid('OCOP', 'VietGAP', 'GlobalGAP', 'Organic', 'Hữu cơ', 'ISO', 'Khác')
    ).optional(),
    // Thông tin sản phẩm
    harvestDate: Joi.date().optional(),
    productionDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
    shelfLife: Joi.string().optional(),
    storageInstructions: Joi.string().optional(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    nutritionInfo: Joi.object({
        calories: Joi.number().optional(),
        protein: Joi.number().optional(),
        carbs: Joi.number().optional(),
        fat: Joi.number().optional(),
        fiber: Joi.number().optional(),
        other: Joi.string().optional()
    }).optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    basePrice: Joi.number().optional(),
    stock: Joi.number().optional(),
    status: Joi.string().valid('active', 'inactive', 'out_of_stock', 'discontinued').optional(),
    // Thông tin xuất xứ
    origin: Joi.object({
        province: Joi.string().optional(),
        district: Joi.string().optional(),
        region: Joi.string().valid('Bắc', 'Trung', 'Nam', 'Tây Nguyên', 'Đồng bằng sông Cửu Long').optional(),
        address: Joi.string().optional()
    }).optional(),
    // Thông tin nhà sản xuất
    producer: Joi.object({
        name: Joi.string().optional(),
        address: Joi.string().optional(),
        contact: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional()
    }).optional(),
    // Chứng nhận
    certification: Joi.array().items(
        Joi.string().valid('OCOP', 'VietGAP', 'GlobalGAP', 'Organic', 'Hữu cơ', 'ISO', 'Khác')
    ).optional(),
    // Thông tin sản phẩm
    harvestDate: Joi.date().optional(),
    productionDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
    shelfLife: Joi.string().optional(),
    storageInstructions: Joi.string().optional(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    nutritionInfo: Joi.object({
        calories: Joi.number().optional(),
        protein: Joi.number().optional(),
        carbs: Joi.number().optional(),
        fat: Joi.number().optional(),
        fiber: Joi.number().optional(),
        other: Joi.string().optional()
    }).optional()
});

module.exports = {
    createProductSchema,
    updateProductSchema
};
