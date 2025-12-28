const authService = require('./auth.service');
const { registerSchema, loginSchema } = require('./auth.validation');
const response = require('../../utils/response');

const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return response.error(res, error.details[0].message);
        }

        const data = await authService.register(req.body);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return response.error(res, error.details[0].message);
        }

        const data = await authService.login(req.body.email, req.body.password);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message, 401);
    }
};

module.exports = {
    register,
    login
};
