const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const upload = require('../../middlewares/upload.middleware');
const auth = require('../../middlewares/auth.middleware');
// For now, allow public access or generic auth. In real app, restrict create/update/delete to admin.

const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);

router.route('/')
    .get(productController.getProducts)
    .post(uploadFields, productController.createProduct); // TODO: Add auth middleware

router.route('/:id')
    .get(productController.getProductById)
    .put(uploadFields, productController.updateProduct) // TODO: Add auth middleware
    .delete(productController.deleteProduct); // TODO: Add auth middleware

module.exports = router;
