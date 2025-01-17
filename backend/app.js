const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const tasksRouter = require('./routes/tasks.routes');
const usersRouter = require('./routes/users.routes');
const rateLimiter = require('./middlewares/rateLimit');
const compression = require('compression');

// Enable CORS
app.use(cors());

// Use compression for response body compression
app.use(compression());

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

// Rate limiter middleware
app.use(rateLimiter);

// Routes
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/users', usersRouter);

// Global Middleware for not found routes
app.all('*', (req, res, next) => {
    next(AppError.create(`This route ${req.originalUrl} is not available on this server!`, 404));
});

// Global Error Middleware
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Something went wrong!',
    });
});

module.exports = app;