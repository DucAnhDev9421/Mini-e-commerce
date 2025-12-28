const express = require('express');
const router = express.Router();
const reviewController = require('./review.controller');
const auth = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { addReview } = require('./review.validation');

router.post('/', auth, validate(addReview), reviewController.addReview);
router.get('/:productId', reviewController.getReviews);

module.exports = router;
