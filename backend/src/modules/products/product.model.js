const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: true
    },
    brand: String,
    basePrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    mainImage: {
        type: String,
        required: [true, 'Please add a main image']
    },
    images: [String],
    // Thông tin xuất xứ địa phương
    origin: {
        province: {
            type: String,
            required: false
        },
        district: {
            type: String,
            required: false
        },
        region: {
            type: String,
            enum: ['Bắc', 'Trung', 'Nam', 'Tây Nguyên', 'Đồng bằng sông Cửu Long'],
            required: false
        },
        address: String
    },
    // Thông tin nhà sản xuất
    producer: {
        name: {
            type: String,
            required: false
        },
        address: String,
        contact: String,
        email: String,
        phone: String
    },
    // Chứng nhận chất lượng
    certification: {
        type: [String],
        enum: ['OCOP', 'VietGAP', 'GlobalGAP', 'Organic', 'Hữu cơ', 'ISO', 'Khác']
    },
    // Thông tin sản phẩm đặc sản
    harvestDate: Date,
    productionDate: Date,
    expiryDate: Date,
    shelfLife: String, // Thời hạn sử dụng (ví dụ: "6 tháng", "1 năm")
    storageInstructions: String, // Hướng dẫn bảo quản
    ingredients: [String], // Thành phần
    nutritionInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number,
        other: String
    },
    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    }],
    // Trạng thái sản phẩm
    status: {
        type: String,
        enum: ['active', 'inactive', 'out_of_stock', 'discontinued'],
        default: 'active'
    },
    // Soft delete
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt trước khi save
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Indexes để tối ưu query
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1 });
productSchema.index({ 'origin.region': 1 });
productSchema.index({ 'origin.province': 1 });
productSchema.index({ status: 1, isDeleted: 1 });
productSchema.index({ basePrice: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
