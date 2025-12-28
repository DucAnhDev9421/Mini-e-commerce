const Order = require('./order.model');
const cartService = require('../cart/cart.service');
const inventoryService = require('../inventory/inventory.service');
// const Product = require('../products/product.model');

const createOrder = async (userId, shippingAddress, paymentMethod) => {
    // 1. Get Cart
    const cart = await cartService.getCart(userId);

    if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
    }

    // 2. Prepare Order Items & Check Stock (Simple check, real Inventory Service handles deduction)
    const orderItems = [];
    for (const item of cart.items) {
        orderItems.push({
            product: item.product._id,
            variant: item.variant?._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.price // Calculated in cart service
        });

        // Deduct Stock
        await inventoryService.reduceStock(
            item.product._id,
            item.variant?._id,
            item.quantity,
            'Order Placed',
            'Pending Order' // Will update with Order ID later if needed or we assume atomic enough
        );
    }

    // 3. Create Order
    const order = await Order.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount: cart.totalAmount,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending' // Logic for online payment would go here
    });

    // Update Inventory Reference (Optional, for better tracking)
    // await Inventory.updateMany({ reference: 'Pending Order' }, { reference: order._id });

    // 4. Clear Cart
    await cartService.clearCart(userId);

    return order;
};

const getMyOrders = async (userId) => {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getOrderById = async (id) => {
    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) throw new Error('Order not found');
    return order;
};

const getAllOrders = async (query) => {
    return await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
};

const updateStatus = async (id, status) => {
    const order = await Order.findById(id);
    if (!order) throw new Error('Order not found');

    order.orderStatus = status;
    if (status === 'Delivered') {
        order.paymentStatus = 'Paid';
    }

    await order.save();
    return order;
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateStatus
};
