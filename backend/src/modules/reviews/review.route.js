const express = require('express');
const router = express.Router();
const reviewController = require('./review.controller');
const auth = require('../../middlewares/auth.middleware');

router.post('/', auth, reviewController.addReview);
router.get('/:productId', reviewController.getReviews);

module.exports = router;
