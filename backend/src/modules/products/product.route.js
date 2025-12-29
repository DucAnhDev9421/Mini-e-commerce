const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const upload = require('../../middlewares/upload.middleware');
const auth = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');

const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);

// Public routes - không cần authentication
router.route('/')
    .get(productController.getProducts)
    .post(auth, authorize(['admin']), uploadFields, productController.createProduct);

// Bulk operations - Admin only
router.post('/bulk', auth, authorize(['admin']), productController.bulkCreateProducts);
router.delete('/bulk', auth, authorize(['admin']), productController.bulkDeleteProducts);

// Statistics - Admin only
router.get('/stats', auth, authorize(['admin']), productController.getProductStats);

// Routes cho đặc sản địa phương - public
router.get('/regions', productController.getAvailableRegions);
router.get('/provinces', productController.getAvailableProvinces);
router.get('/by-region/:region', productController.getProductsByRegion);
router.get('/by-province/:province', productController.getProductsByProvince);
router.get('/by-category/:category', productController.getProductsByCategory);
router.get('/by-certification/:certification', productController.getProductsByCertification);

// Public route - xem chi tiết sản phẩm
router.route('/:id')
    .get(productController.getProductById)
    .put(auth, authorize(['admin']), uploadFields, productController.updateProduct)
    .patch(auth, authorize(['admin']), uploadFields, productController.patchProduct)
    .delete(auth, authorize(['admin']), productController.deleteProduct);

// Restore deleted product - Admin only
router.patch('/:id/restore', auth, authorize(['admin']), productController.restoreProduct);

module.exports = router;
