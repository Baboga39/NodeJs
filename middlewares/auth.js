const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = getJwt(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'No token provided',
      result: null,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('No token provided');
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Invalid token',
        result: err.message,
      });
    }
    req.user = user;
    next();
  });
};

const getJwt = (req) => {
  const authHeader = req.header('Authorization');

  if (authHeader && authHeader.startsWith('Bearer')) {
    return authHeader.replace('Bearer ', '');
  }

  return null;
};

module.exports = authenticateToken;
