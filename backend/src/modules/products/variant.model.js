const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    color: String,
    size: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    attributes: {
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Variant', variantSchema);
