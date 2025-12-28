const Payment = require('./payment.model');
const Order = require('../orders/order.model');
const crypto = require('crypto');

// Mock MoMo config
const MOMO_CONFIG = {
    partnerCode: process.env.MOMO_PARTNER_CODE || 'MOMO_PARTNER_Mock',
    accessKey: process.env.MOMO_ACCESS_KEY || 'MOMO_ACCESS_Mock',
    secretKey: process.env.MOMO_SECRET_KEY || 'MOMO_SECRET_Mock'
};

const processPayment = async (userId, orderId, paymentMethod) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    if (order.user.toString() !== userId) throw new Error('Unauthorized');
    if (order.paymentStatus === 'Paid') throw new Error('Order already paid');

    if (paymentMethod === 'COD') {
        const payment = await Payment.create({
            order: orderId,
            user: userId,
            amount: order.totalAmount,
            paymentMethod: 'COD',
            status: 'Pending'
        });
        return { payment, message: 'COD Order placed successfully' };
    }

    if (paymentMethod === 'MoMo') {
        const requestId = crypto.randomUUID();
        const momoOrderId = `MOMO${orderId}_${Date.now()}`;

        // Save initial payment record
        const payment = await Payment.create({
            order: orderId,
            user: userId,
            amount: order.totalAmount,
            paymentMethod: 'MoMo',
            momoRequestId: requestId,
            momoOrderId: momoOrderId,
            status: 'Pending'
        });

        // Generate Mock URL
        // In a real app, we'd sign the request and call MoMo API
        // Here we return a URL that hits our own backend to simulate success
        const mockPayUrl = `http://localhost:${process.env.PORT || 5000}/api/v1/payments/momo-mock-success?orderId=${orderId}&paymentId=${payment._id}`;

        return {
            payment,
            payUrl: mockPayUrl,
            message: 'Proceed to payment'
        };
    }

    throw new Error('Unsupported payment method');
};

const handleMockMomoSuccess = async (orderId, paymentId) => {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error('Payment not found');

    // Simulate successful transaction
    payment.status = 'Completed';
    payment.result = { message: 'Mock Success' };
    await payment.save();

    const order = await Order.findById(orderId);
    if (order) {
        order.paymentStatus = 'Paid';
        order.paymentMethod = 'MoMo';
        await order.save();
    }

    return { message: 'Payment successful', orderId };
};

const getPaymentByOrder = async (orderId) => {
    return await Payment.findOne({ order: orderId });
};

module.exports = {
    processPayment,
    handleMockMomoSuccess,
    getPaymentByOrder
};
