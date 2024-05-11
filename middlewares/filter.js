const authenticateToken = require('./auth');


const filterMiddleware = (allowedRoles) => {
return (req, res, next) => {
    authenticateToken(req, res, () => {
    if (!allowedRoles.includes(req.user.user.roles)) {
        return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Permission denied. You are not allowed to access this request',
        result: null,
        });
    }
    next();
    });
};
};

module.exports = filterMiddleware
