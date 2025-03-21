const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const { promisify } = require('util');

const verifyJwt = promisify(jwt.verify);


const authenticateToken = async (req, res, next) => {
  try {
    const token = getJwt(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'No token provided',
        result: null,
      });
    }

    const decoded = await verifyJwt(token, process.env.JWT_SECRET);

    console.log(decoded)

    const tokenKey = `TOKEN_BLACK_LIST_${decoded.user._id}_${decoded.user.jti}`;
    const isBlacklisted = await redisClient.get(tokenKey);


    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token has been revoked',
        result: null,
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token expired',
        result: null,
      });
    } else {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Invalid token',
        result: err.message,
      });
    }
  }
};

const getJwt = (req) => {
  const authHeader = req.header('Authorization');
  return authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
};

module.exports = authenticateToken;
