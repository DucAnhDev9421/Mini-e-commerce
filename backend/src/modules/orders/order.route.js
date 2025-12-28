const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');
const validate = require('../../middlewares/validate.middleware');
const { createOrder, updateStatus } = require('./order.validation');

router.use(auth);

router.post('/', validate(createOrder), orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);

// Admin Routes
router.get('/', role(['admin']), orderController.getAllOrders);
router.put('/:id/status', role(['admin']), validate(updateStatus), orderController.updateStatus);

module.exports = router;
