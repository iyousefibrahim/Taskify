const express = require('express')
const app = express();
const morgan = require('morgan');
const tasksRouter = require('./routes/tasks.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tasks', tasksRouter);

// Global Middleware for not found routes
app.all('*', (req, res, next) => {
    next(AppError.create(`This route ${req.originalUrl} is not available on this server!`, 404));
});

// Global Error Middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status ? 'fail' : 'error',
        message: error.message || 'Something went wrong!'
    });
});

module.exports = app;