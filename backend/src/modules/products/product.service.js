const Product = require('./product.model');
const pagination = require('../../utils/pagination');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const getProducts = async (query) => {
    // Advanced filtering and pagination
    const { 
        page = 1, 
        limit = 10, 
        category, 
        search, 
        region, 
        province, 
        district, 
        producer,
        minPrice,
        maxPrice,
        inStock,
        status,
        certification,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = query;
    
    const filter = { isDeleted: false }; // Chỉ lấy sản phẩm chưa bị xóa

    if (category) filter.category = category;
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { 'producer.name': { $regex: search, $options: 'i' } }
        ];
    }
    
    // Filter theo vùng miền
    if (region) {
        filter['origin.region'] = region;
    }
    
    // Filter theo tỉnh/thành phố
    if (province) {
        filter['origin.province'] = { $regex: province, $options: 'i' };
    }
    
    // Filter theo quận/huyện
    if (district) {
        filter['origin.district'] = { $regex: district, $options: 'i' };
    }
    
    // Filter theo nhà sản xuất
    if (producer) {
        filter['producer.name'] = { $regex: producer, $options: 'i' };
    }
    
    // Filter theo giá
    if (minPrice || maxPrice) {
        filter.basePrice = {};
        if (minPrice) filter.basePrice.$gte = parseFloat(minPrice);
        if (maxPrice) filter.basePrice.$lte = parseFloat(maxPrice);
    }
    
    // Filter theo stock
    if (inStock === 'true') {
        filter.stock = { $gt: 0 };
    } else if (inStock === 'false') {
        filter.stock = { $lte: 0 };
    }
    
    // Filter theo status
    if (status) {
        filter.status = status;
    }
    
    // Filter theo certification
    if (certification) {
        filter.certification = { $in: [certification] };
    }

    const skip = (page - 1) * limit;
    
    // Sorting
    const sortOptions = {};
    const validSortFields = ['name', 'basePrice', 'createdAt', 'stock', 'updatedAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    sortOptions[sortField] = order;

    const products = await Product.find(filter)
        .populate('variants')
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sortOptions);

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
    const product = await Product.findOne({ _id: id, isDeleted: false }).populate('variants');
    if (!product) throw new Error('Product not found');
    return product;
};

const updateProduct = async (id, updateData) => {
    const product = await Product.findOneAndUpdate(
        { _id: id, isDeleted: false }, 
        updateData, 
        { new: true, runValidators: true }
    );
    if (!product) throw new Error('Product not found');
    return product;
};

// Partial update (PATCH)
const patchProduct = async (id, updateData) => {
    const product = await Product.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: updateData },
        { new: true, runValidators: true }
    );
    if (!product) throw new Error('Product not found');
    return product;
};

// Soft delete
const deleteProduct = async (id) => {
    const product = await Product.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { 
            isDeleted: true,
            deletedAt: new Date(),
            status: 'discontinued'
        },
        { new: true }
    );
    if (!product) throw new Error('Product not found');
    return { id, message: 'Product deleted successfully' };
};

// Hard delete (chỉ dùng khi thực sự cần)
const hardDeleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return { id, message: 'Product permanently deleted' };
};

// Restore deleted product
const restoreProduct = async (id) => {
    const product = await Product.findOneAndUpdate(
        { _id: id, isDeleted: true },
        { 
            isDeleted: false,
            deletedAt: null,
            status: 'active'
        },
        { new: true }
    );
    if (!product) throw new Error('Product not found or not deleted');
    return product;
};

// Lấy sản phẩm theo vùng miền
const getProductsByRegion = async (region, query = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const filter = { 
        'origin.region': region,
        isDeleted: false
    };
    
    const skip = (page - 1) * limit;
    const sortOptions = {};
    const validSortFields = ['name', 'basePrice', 'createdAt', 'stock'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    sortOptions[sortField] = order;
    
    const products = await Product.find(filter)
        .populate('variants')
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sortOptions);
    
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

// Lấy sản phẩm theo tỉnh/thành phố
const getProductsByProvince = async (province, query = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const filter = { 
        'origin.province': { $regex: province, $options: 'i' },
        isDeleted: false
    };
    
    const skip = (page - 1) * limit;
    const sortOptions = {};
    const validSortFields = ['name', 'basePrice', 'createdAt', 'stock'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    sortOptions[sortField] = order;
    
    const products = await Product.find(filter)
        .populate('variants')
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sortOptions);
    
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

// Lấy danh sách các vùng miền có sản phẩm
const getAvailableRegions = async () => {
    const regions = await Product.distinct('origin.region', { 
        'origin.region': { $exists: true, $ne: null },
        isDeleted: false
    });
    return regions;
};

// Lấy danh sách các tỉnh/thành phố có sản phẩm
const getAvailableProvinces = async () => {
    const provinces = await Product.distinct('origin.province', { 
        'origin.province': { $exists: true, $ne: null },
        isDeleted: false
    });
    return provinces;
};

// Lấy sản phẩm theo category
const getProductsByCategory = async (category, query = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const filter = { 
        category: { $regex: category, $options: 'i' },
        isDeleted: false
    };
    
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const products = await Product.find(filter)
        .populate('variants')
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sortOptions);
    
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

// Lấy sản phẩm theo certification
const getProductsByCertification = async (certification, query = {}) => {
    const { page = 1, limit = 10 } = query;
    const filter = { 
        certification: { $in: [certification] },
        isDeleted: false
    };
    
    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
        .populate('variants')
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

// Bulk create products
const bulkCreateProducts = async (productsData) => {
    const products = await Product.insertMany(productsData);
    return products;
};

// Bulk delete products (soft delete)
const bulkDeleteProducts = async (ids) => {
    const result = await Product.updateMany(
        { _id: { $in: ids }, isDeleted: false },
        { 
            isDeleted: true,
            deletedAt: new Date(),
            status: 'discontinued'
        }
    );
    return { deletedCount: result.modifiedCount, ids };
};

// Get product statistics
const getProductStats = async () => {
    const stats = {
        total: await Product.countDocuments({ isDeleted: false }),
        active: await Product.countDocuments({ status: 'active', isDeleted: false }),
        inactive: await Product.countDocuments({ status: 'inactive', isDeleted: false }),
        outOfStock: await Product.countDocuments({ status: 'out_of_stock', isDeleted: false }),
        discontinued: await Product.countDocuments({ status: 'discontinued', isDeleted: false }),
        byCategory: await Product.aggregate([
            { $match: { isDeleted: false } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]),
        byRegion: await Product.aggregate([
            { $match: { isDeleted: false, 'origin.region': { $exists: true } } },
            { $group: { _id: '$origin.region', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ])
    };
    return stats;
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    patchProduct,
    deleteProduct,
    hardDeleteProduct,
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
