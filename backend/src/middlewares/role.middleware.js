const response = require('../utils/response');

module.exports = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return response.error(res, 'Not authorized to access this route', 401);
        }

        // Support both array and single role
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)) {
            return response.error(res, `User role '${req.user.role}' is not authorized to access this route`, 403);
        }

        next();
    };
};
