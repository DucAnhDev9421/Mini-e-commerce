const paymentService = require('./payment.service');
const response = require('../../utils/response');

const initiatePayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;
        const result = await paymentService.processPayment(req.user.id, orderId, paymentMethod);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const mockMomoSuccess = async (req, res) => {
    try {
        const { orderId, paymentId } = req.query;
        const result = await paymentService.handleMockMomoSuccess(orderId, paymentId);
        // In a real frontend app, we'd redirect to a frontend success page.
        // For API testing, we just return JSON.
        res.status(200).json({
            success: true,
            message: 'Payment verified successfully (Mock)',
            data: result
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getPaymentByOrder = async (req, res) => {
    try {
        const result = await paymentService.getPaymentByOrder(req.params.orderId);
        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    initiatePayment,
    mockMomoSuccess,
    getPaymentByOrder
};
