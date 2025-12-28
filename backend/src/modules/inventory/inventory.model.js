const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    },
    type: {
        type: String,
        enum: ['IN', 'OUT'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    reference: String, // e.g., Order ID
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);
