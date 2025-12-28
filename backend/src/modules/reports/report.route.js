const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

router.use(auth);
router.use(role(['admin'])); // All report routes are admin only

router.get('/stats', reportController.getDashboardStats);
router.get('/sales', reportController.getSalesChart);
router.get('/top-products', reportController.getTopProducts);

module.exports = router;
