const Review = require('./review.model');
const Order = require('../orders/order.model');

const addReview = async (userId, productId, rating, comment) => {
    // 1. Check if user has purchased and received the product
    const hasPurchased = await Order.findOne({
        user: userId,
        "items.product": productId,
        orderStatus: 'Delivered'
    });

    if (!hasPurchased) {
        throw new Error('You can only review products you have purchased and received.');
    }

    // 2. Check for duplicate review
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
        throw new Error('You have already reviewed this product.');
    }

    // 3. Create Review
    const review = await Review.create({
        user: userId,
        product: productId,
        rating,
        comment
    });

    return review;
};

const getReviews = async (productId) => {
    return await Review.find({ product: productId })
        .populate('user', 'name')
        .sort({ createdAt: -1 });
};

module.exports = {
    addReview,
    getReviews
};
