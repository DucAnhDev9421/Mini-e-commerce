const express = require('express');
const router = express.Router();
const authRoutes = require('./modules/auth/auth.route');
const productRoutes = require('./modules/products/product.route');
const inventoryRoutes = require('./modules/inventory/inventory.route');
const cartRoutes = require('./modules/cart/cart.route');
const orderRoutes = require('./modules/orders/order.route');
const paymentRoutes = require('./modules/payments/payment.route');
const shipmentRoutes = require('./modules/shipments/shipment.route');
const reviewRoutes = require('./modules/reviews/review.route');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
