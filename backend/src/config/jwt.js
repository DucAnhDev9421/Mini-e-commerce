const jwt = require('jsonwebtoken');
const config = require('./env');

const jwtConfig = {
    // JWT Secret key (từ environment variable)
    secret: config.jwtSecret,
    
    // Token expiration time
    expiresIn: '30d', // 30 ngày
    
    // Token refresh expiration (nếu cần refresh token)
    refreshExpiresIn: '90d', // 90 ngày
    
    // Algorithm để sign token
    algorithm: 'HS256',
    
    // Issuer (người phát hành token)
    issuer: 'mini-e-commerce-api',
    
    // Audience (đối tượng sử dụng token)
    audience: 'mini-e-commerce-client',
    
    // Token options cho việc sign
    signOptions: {
        expiresIn: '30d',
        algorithm: 'HS256',
        issuer: 'mini-e-commerce-api',
        audience: 'mini-e-commerce-client'
    },
    
    // Token options cho việc verify
    verifyOptions: {
        algorithms: ['HS256'],
        issuer: 'mini-e-commerce-api',
        audience: 'mini-e-commerce-client'
    },
    
    // Cookie options (nếu sử dụng cookie để lưu token)
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS trong production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 ngày (milliseconds)
    }
};

// Helper function để generate token
jwtConfig.generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, jwtConfig.signOptions);
};

// Helper function để verify token
jwtConfig.verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.secret, jwtConfig.verifyOptions);
};

// Helper function để decode token (không verify)
jwtConfig.decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = jwtConfig;
