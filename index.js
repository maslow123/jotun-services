require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const users = require('./routes/users');

// ROUTES
const prefix = '/api/v1/';
app.use(`${prefix}`, users);

const HTTP_PORT = process.env.HTTP_PORT;

if (process.env.NODE_ENV === 'development'){
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on port ${HTTP_PORT}`);
    });
}

module.exports = app;