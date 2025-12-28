const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Order schema definition
});

module.exports = mongoose.model('Order', orderSchema);
