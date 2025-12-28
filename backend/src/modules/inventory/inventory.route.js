const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');
const validate = require('../../middlewares/validate.middleware');
const { adjustStock } = require('./inventory.validation');

// Protect these routes in real app
router.post('/adjust', validate(adjustStock), inventoryController.adjustStock);
router.get('/:productId', inventoryController.getHistory);

module.exports = router;
