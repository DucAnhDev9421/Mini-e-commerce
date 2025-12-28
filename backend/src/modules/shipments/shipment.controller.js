const shipmentService = require('./shipment.service');
const response = require('../../utils/response');

const createShipment = async (req, res) => {
    try {
        const { orderId, carrier } = req.body;
        const shipment = await shipmentService.createShipment(orderId, carrier);
        response.success(res, shipment, 201);
    } catch (err) {
        response.error(res, err.message);
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        const shipment = await shipmentService.updateStatus(req.params.id, status, note);
        response.success(res, shipment);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getShipment = async (req, res) => {
    try {
        // Param can be orderId or shipmentId.
        // For simplicity, let's assume route /:id is shipmentId
        let shipment = await shipmentService.getShipmentById(req.params.id);
        if (!shipment) {
            // Try seeking by order ID if typical usage? or rely on separate route
        }
        response.success(res, shipment);
    } catch (err) {
        response.error(res, err.message, 404);
    }
};

const getShipmentByOrder = async (req, res) => {
    try {
        const shipment = await shipmentService.getShipmentByOrder(req.params.orderId);
        response.success(res, shipment);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    createShipment,
    updateStatus,
    getShipment,
    getShipmentByOrder
};
