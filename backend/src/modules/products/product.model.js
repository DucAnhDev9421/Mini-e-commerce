const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Product schema definition
});

module.exports = mongoose.model('Product', productSchema);
