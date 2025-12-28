const reviewService = require('./review.service');
const response = require('../../utils/response');

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const review = await reviewService.addReview(req.user.id, productId, rating, comment);
        response.success(res, review, 201);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviews(req.params.productId);
        response.success(res, reviews);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    addReview,
    getReviews
};
