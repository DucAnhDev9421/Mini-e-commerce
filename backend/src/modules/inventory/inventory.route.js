const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');
const validate = require('../../middlewares/validate.middleware');
const auth = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');
const { adjustStock } = require('./inventory.validation');

// Admin only routes
router.post('/adjust', auth, authorize(['admin']), validate(adjustStock), inventoryController.adjustStock);
router.get('/:productId', auth, authorize(['admin']), inventoryController.getHistory);

module.exports = router;
