const orderService = require('./order.service');
const response = require('../../utils/response');

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const order = await orderService.createOrder(req.user.id, shippingAddress, paymentMethod);
        response.success(res, order, 201);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id);
        response.success(res, orders);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        // Ensure user owns order or is admin
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return response.error(res, 'Not authorized', 403);
        }
        response.success(res, order);
    } catch (err) {
        response.error(res, err.message, 404);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders(req.query);
        response.success(res, orders);
    } catch (err) {
        response.error(res, err.message);
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateStatus(req.params.id, status);
        response.success(res, order);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateStatus
};
