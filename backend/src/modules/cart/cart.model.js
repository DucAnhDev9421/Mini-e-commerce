const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // Cart schema definition
});

module.exports = mongoose.model('Cart', cartSchema);
