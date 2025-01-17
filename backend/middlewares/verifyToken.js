const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        const error = new AppError('Token Is Required!', 401);
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (err) {
        const error = new AppError('Invalid Token!', 401);
        return next(error);
    }
};

module.exports = verifyToken;