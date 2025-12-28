const Order = require('../orders/order.model');
const User = require('../auth/user.model');
const Product = require('../products/product.model');

const getDashboardStats = async () => {
    // 1. Total Users
    const totalUsers = await User.countDocuments({ role: 'user' });

    // 2. Total Orders
    const totalOrders = await Order.countDocuments();

    // 3. Total Revenue (sum of totalAmount where paymentStatus is Paid)
    const revenueAgg = await Order.aggregate([
        { $match: { paymentStatus: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // 4. Status Breakdown
    const statusAgg = await Order.aggregate([
        { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
    ]);

    const statusBreakdown = {
        Pending: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0
    };
    statusAgg.forEach(item => {
        if (statusBreakdown[item._id] !== undefined) {
            statusBreakdown[item._id] = item.count;
        }
    });

    return {
        totalUsers,
        totalOrders,
        totalRevenue,
        statusBreakdown
    };
};

const getSalesChart = async (startDate, endDate) => {
    // Default to last 7 days if not provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sales = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: start, $lte: end },
                paymentStatus: 'Paid' // Only count paid orders for revenue chart? Or all orders? Usually paid for revenue.
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: "$totalAmount" },
                orders: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    return sales;
};

const getTopProducts = async (limit = 5) => {
    const topProducts = await Order.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.product",
                name: { $first: "$items.name" },
                totalSold: { $sum: "$items.quantity" },
                revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
            }
        },
        { $sort: { totalSold: -1 } },
        { $limit: parseInt(limit) }
    ]);

    // Populate extra details if needed (like image) - normally aggregation is fast enough but we might want images
    const populated = await Product.populate(topProducts, { path: '_id', select: 'mainImage' });

    return populated.map(p => ({
        id: p._id._id,
        name: p.name, // Use simple name from order item or populated product
        image: p._id.mainImage,
        totalSold: p.totalSold,
        revenue: p.revenue
    }));
};

module.exports = {
    getDashboardStats,
    getSalesChart,
    getTopProducts
};
