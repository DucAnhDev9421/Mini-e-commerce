const express = require('express');
const router = express.Router();
const shipmentController = require('./shipment.controller');
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');
const validate = require('../../middlewares/validate.middleware');
const { createShipment, updateStatus } = require('./shipment.validation');

router.use(auth);

// Admin Routes (Create/Update)
router.post('/', role(['admin']), validate(createShipment), shipmentController.createShipment);
router.put('/:id', role(['admin']), validate(updateStatus), shipmentController.updateStatus);

// User/Admin Routes (View)
router.get('/:id', shipmentController.getShipment); // View by Shipment ID
router.get('/order/:orderId', shipmentController.getShipmentByOrder); // View by Order ID

module.exports = router;
