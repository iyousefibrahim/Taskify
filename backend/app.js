const express = require('express')
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `This route ${req.originalUrl} is not available on this server!`
    });
});

module.exports = app;