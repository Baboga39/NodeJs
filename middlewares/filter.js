const authenticateToken = require('./auth');


const filterMiddleware = (allowedRoles) => {
return (req, res, next) => {
    authenticateToken(req, res, () => {
    if (!allowedRoles.includes(req.user.user.roles)) {
        console.log(req.user.roles)
        console.log(allowedRoles)
        return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Permission denied. Insufficient role.',
        result: null,
        });
    }

    next();
    });
};
};

module.exports = filterMiddleware
