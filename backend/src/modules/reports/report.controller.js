const reportService = require('./report.service');
const response = require('../../utils/response');

const getDashboardStats = async (req, res) => {
    try {
        const stats = await reportService.getDashboardStats();
        response.success(res, stats);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getSalesChart = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const chart = await reportService.getSalesChart(startDate, endDate);
        response.success(res, chart);
    } catch (err) {
        response.error(res, err.message);
    }
};

const getTopProducts = async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await reportService.getTopProducts(limit);
        response.success(res, products);
    } catch (err) {
        response.error(res, err.message);
    }
};

module.exports = {
    getDashboardStats,
    getSalesChart,
    getTopProducts
};
