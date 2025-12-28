const express = require('express');
const router = express.Router();
const shipmentController = require('./shipment.controller');
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');

router.use(auth);

// Admin Routes (Create/Update)
router.post('/', role(['admin']), shipmentController.createShipment);
router.put('/:id', role(['admin']), shipmentController.updateStatus);

// User/Admin Routes (View)
router.get('/:id', shipmentController.getShipment); // View by Shipment ID
router.get('/order/:orderId', shipmentController.getShipmentByOrder); // View by Order ID

module.exports = router;
