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
    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
