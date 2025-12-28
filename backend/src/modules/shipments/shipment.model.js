const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trackingNumber: {
        type: String,
        required: true,
        unique: true
    },
    carrier: {
        type: String,
        required: true,
        default: 'Standard Express'
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Failed'],
        default: 'Pending'
    },
    estimatedDelivery: {
        type: Date
    },
    actualDelivery: {
        type: Date
    },
    history: [{
        status: String,
        date: { type: Date, default: Date.now },
        note: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
