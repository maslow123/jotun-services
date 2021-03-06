require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan');


app.use(cors());
app.use(express.json());
app.use(logger('dev'));


const users = require('./routes/users');
const events = require('./routes/events');
const sub_events = require('./routes/sub-events');
const user_events = require('./routes/user-events');
const confirm_invitation = require('./routes/confirm-invitation');
const master = require('./routes/master');
const schedules = require('./routes/schedules');
const rewards = require('./routes/rewards');
const scan_info = require('./routes/scan-info');

// ROUTES
const prefix = '/api/v1/';
app.use(`${prefix}`, users);
app.use(`${prefix}`, events);
app.use(`${prefix}`, sub_events);
app.use(`${prefix}`, user_events);
app.use(`${prefix}`, confirm_invitation);
app.use(`${prefix}`, master);
app.use(`${prefix}`, schedules);
app.use(`${prefix}`, rewards);
app.use(`${prefix}`, scan_info);


const HTTP_PORT = process.env.HTTP_PORT;

if (process.env.NODE_ENV === 'development'){
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on port ${HTTP_PORT}`);
    });
}

module.exports = app;