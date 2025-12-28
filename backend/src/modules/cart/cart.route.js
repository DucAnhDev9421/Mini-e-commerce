const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const auth = require('../../middlewares/auth.middleware');

router.use(auth); // Require login for all cart routes

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateQuantity);
router.delete('/remove', cartController.removeItem); // Using body for productId/variantId

module.exports = router;
