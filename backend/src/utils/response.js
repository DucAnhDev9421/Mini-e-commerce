module.exports = {
    success: (res, data) => {
        res.status(200).json({ success: true, data });
    },
    error: (res, message, status = 400) => {
        res.status(status).json({ success: false, message });
    }
};
