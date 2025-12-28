const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const auth = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { addToCart, updateQty } = require('./cart.validation');

router.use(auth); // Require login for all cart routes

router.get('/', cartController.getCart);
router.post('/add', validate(addToCart), cartController.addToCart);
router.put('/update', validate(updateQty), cartController.updateQuantity);
router.delete('/remove', cartController.removeItem); // Using body for productId/variantId

module.exports = router;
