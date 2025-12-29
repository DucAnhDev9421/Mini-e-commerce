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

const patchProduct = async (req, res) => {
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
                updateData.images = req.files.images.map(file => file.path);
            }
        }

        const product = await productService.patchProduct(req.params.id, updateData);
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

const getProductsByRegion = async (req, res) => {
    try {
        const result = await productService.getProductsByRegion(req.params.region, req.query);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProductsByProvince = async (req, res) => {
    try {
        const result = await productService.getProductsByProvince(req.params.province, req.query);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getAvailableRegions = async (req, res) => {
    try {
        const regions = await productService.getAvailableRegions();
        response.success(res, { regions });
    } catch (err) {
        response.error(res, err.message);
    }
};

const getAvailableProvinces = async (req, res) => {
    try {
        const provinces = await productService.getAvailableProvinces();
        response.success(res, { provinces });
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const result = await productService.getProductsByCategory(req.params.category, req.query);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProductsByCertification = async (req, res) => {
    try {
        const result = await productService.getProductsByCertification(req.params.certification, req.query);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const bulkCreateProducts = async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return response.error(res, 'Products array is required', 400);
        }
        
        // Validate each product
        const { createProductSchema } = require('./product.validation');
        for (const product of products) {
            const { error } = createProductSchema.validate(product);
            if (error) {
                return response.error(res, `Invalid product data: ${error.details[0].message}`, 400);
            }
        }
        
        const createdProducts = await productService.bulkCreateProducts(products);
        response.success(res, { products: createdProducts, count: createdProducts.length }, 201);
    } catch (err) {
        response.error(res, err.message);
    }
};

const bulkDeleteProducts = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return response.error(res, 'Product IDs array is required', 400);
        }
        
        const result = await productService.bulkDeleteProducts(ids);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const restoreProduct = async (req, res) => {
    try {
        const product = await productService.restoreProduct(req.params.id);
        response.success(res, product);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getProductStats = async (req, res) => {
    try {
        const stats = await productService.getProductStats();
        response.success(res, stats);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    patchProduct,
    deleteProduct,
    restoreProduct,
    getProductsByRegion,
    getProductsByProvince,
    getProductsByCategory,
    getProductsByCertification,
    getAvailableRegions,
    getAvailableProvinces,
    bulkCreateProducts,
    bulkDeleteProducts,
    getProductStats
};
