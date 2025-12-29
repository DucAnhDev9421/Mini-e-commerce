const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');
const jwtConfig = require('../config/jwt');
const response = require('../utils/response');

module.exports = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return response.error(res, 'Not authorized to access this route', 401);
        }

        try {
            // Verify token với cấu hình từ jwt.js
            const decoded = jwt.verify(token, jwtConfig.secret, jwtConfig.verifyOptions);

            // Get user from token
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return response.error(res, 'User not found', 401);
            }

            next();
        } catch (err) {
            // Xử lý các lỗi cụ thể
            if (err.name === 'TokenExpiredError') {
                return response.error(res, 'Token has expired', 401);
            }
            if (err.name === 'JsonWebTokenError') {
                return response.error(res, 'Invalid token', 401);
            }
            return response.error(res, 'Not authorized to access this route', 401);
        }
    } catch (err) {
        return response.error(res, 'Authentication error', 500);
    }
};
