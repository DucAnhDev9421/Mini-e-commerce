const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');
const auth = require('../../middlewares/auth.middleware');

// Public route for our Mock Callback (so browser/redirect can hit it easily without headers if needed, 
// though strictly it should be standard. Let's keep it public for simplicity in demo).
router.get('/momo-mock-success', paymentController.mockMomoSuccess);

// Protected
router.post('/initiate', auth, paymentController.initiatePayment);
router.get('/:orderId', auth, paymentController.getPaymentByOrder);

module.exports = router;
