const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

router.use(auth);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);

// Admin Routes
router.get('/', role(['admin']), orderController.getAllOrders);
router.put('/:id/status', role(['admin']), orderController.updateStatus);

module.exports = router;
