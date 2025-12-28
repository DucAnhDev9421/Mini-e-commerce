const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');
// const auth = require('../../middlewares/auth.middleware');
// const role = require('../../middlewares/role.middleware');

// Protect these routes in real app
router.post('/adjust', inventoryController.adjustStock);
router.get('/:productId', inventoryController.getHistory);

module.exports = router;
