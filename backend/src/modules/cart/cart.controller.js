const cartService = require('./cart.service');
const response = require('../../utils/response');

const getCart = async (req, res) => {
    try {
        // req.user.id comes from auth middleware
        const cart = await cartService.getCart(req.user.id);
        response.success(res, cart);
    } catch (err) {
        response.error(res, err.message);
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, variantId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, variantId, quantity);
        response.success(res, cart);
    } catch (err) {
        response.error(res, err.message);
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { productId, variantId, quantity } = req.body;
        const cart = await cartService.updateQuantity(req.user.id, productId, variantId, quantity);
        response.success(res, cart);
    } catch (err) {
        response.error(res, err.message);
    }
};

const removeItem = async (req, res) => {
    try {
        const { productId, variantId } = req.body;
        const cart = await cartService.removeItem(req.user.id, productId, variantId);
        response.success(res, cart);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem
};
