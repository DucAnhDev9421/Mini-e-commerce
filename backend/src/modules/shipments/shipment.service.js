const Shipment = require('./shipment.model');
const Order = require('../orders/order.model');
const Payment = require('../payments/payment.model');

const createShipment = async (orderId, carrier = 'Standard Express') => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    if (order.orderStatus === 'Pending') {
        // Automatically move to processing -> shipped? Or just allow from Pending.
        // Let's assume we are moving to Shipped directly for simplicity
    }

    // Generate mock tracking
    const trackingNumber = 'TRK' + Date.now() + Math.floor(Math.random() * 1000);

    const shipment = await Shipment.create({
        order: orderId,
        user: order.user,
        trackingNumber,
        carrier,
        status: 'Shipped',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
        history: [{ status: 'Shipped', note: 'Package has been picked up' }]
    });

    // Update Order
    order.orderStatus = 'Shipped';
    await order.save();

    return shipment;
};

const updateStatus = async (shipmentId, status, note) => {
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) throw new Error('Shipment not found');

    shipment.status = status;
    shipment.history.push({ status, note });

    if (status === 'Delivered') {
        shipment.actualDelivery = Date.now();

        // Update Order
        const order = await Order.findById(shipment.order);
        if (order) {
            order.orderStatus = 'Delivered';

            // Handle COD Payment
            if (order.paymentMethod === 'COD' && order.paymentStatus === 'Pending') {
                order.paymentStatus = 'Paid';
                // Find and update payment record
                await Payment.findOneAndUpdate(
                    { order: order._id },
                    { status: 'Completed', result: { note: 'Collected on Delivery' } }
                );
            }
            await order.save();
        }
    }

    await shipment.save();
    return shipment;
};

const getShipmentByOrder = async (orderId) => {
    return await Shipment.findOne({ order: orderId });
};

const getShipmentById = async (id) => {
    return await Shipment.findById(id).populate('order');
};

module.exports = {
    createShipment,
    updateStatus,
    getShipmentByOrder,
    getShipmentById
};
