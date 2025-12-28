const inventoryService = require('./inventory.service');
const response = require('../../utils/response');

const adjustStock = async (req, res) => {
    try {
        const { productId, variantId, quantity, type, reason, reference } = req.body;

        // Simple validation
        if (!productId || !quantity || !type || !reason) {
            return response.error(res, 'Missing required fields');
        }

        let result;
        if (type === 'IN') {
            result = await inventoryService.addStock(productId, variantId, quantity, reason, reference);
        } else if (type === 'OUT') {
            result = await inventoryService.reduceStock(productId, variantId, quantity, reason, reference);
        } else {
            return response.error(res, 'Invalid transaction type');
        }

        response.success(res, result);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await inventoryService.getHistory(req.params.productId);
        response.success(res, history);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    adjustStock,
    getHistory
};
