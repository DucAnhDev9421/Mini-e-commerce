const productService = require('./product.service');
const { createProductSchema, updateProductSchema } = require('./product.validation');
const response = require('../../utils/response');

const createProduct = async (req, res) => {
    try {
        const { error } = createProductSchema.validate(req.body);
        if (error) {
            return response.error(res, error.details[0].message);
        }

        // Handle image uploads
        const productData = { ...req.body };
        if (req.files) {
            if (req.files.mainImage && req.files.mainImage[0]) {
                productData.mainImage = req.files.mainImage[0].path;
            }
            if (req.files.images) {
                productData.images = req.files.images.map(file => file.path);
            }
        }

        const product = await productService.createProduct(productData);
        response.success(res, product, 201);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req.query);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        response.success(res, product);
    } catch (err) {
        response.error(res, err.message, 404);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { error } = updateProductSchema.validate(req.body);
        if (error) {
            return response.error(res, error.details[0].message);
        }

        const updateData = { ...req.body };
        if (req.files) {
            if (req.files.mainImage && req.files.mainImage[0]) {
                updateData.mainImage = req.files.mainImage[0].path;
            }
            if (req.files.images) {
                // Append or replace? For simplicity, we might replace if provided.
                updateData.images = req.files.images.map(file => file.path);
            }
        }

        const product = await productService.updateProduct(req.params.id, updateData);
        response.success(res, product);
    } catch (err) {
        response.error(res, err.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        response.success(res, { message: 'Product deleted' });
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
