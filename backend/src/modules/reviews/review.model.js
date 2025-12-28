const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // Review schema definition
});

module.exports = mongoose.model('Review', reviewSchema);
