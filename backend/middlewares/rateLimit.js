const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: {
        status: 'error',
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: 60
    },
    headers: true,
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = rateLimiter;
