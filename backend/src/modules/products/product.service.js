const Product = require('./product.model');
const pagination = require('../../utils/pagination');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const getProducts = async (query) => {
    // Basic filtering and pagination
    const { page = 1, limit = 10, category, search } = query;
    const filter = {};

    if (category) filter.category = category;
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    return {
        products,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

const getProductById = async (id) => {
    const product = await Product.findById(id).populate('variants');
    if (!product) throw new Error('Product not found');
    return product;
};

const updateProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!product) throw new Error('Product not found');
    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return { id };
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
