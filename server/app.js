const express = require('express');
const app = express();

//test functionality of the app server
app.get('/', async (req, res, next) => {
    res.send('Hello Express')
});

const apiRouter = require('./api');
app.use('/api', apiRouter);

const authRouter = require('./auth');
app.use('/auth', authRouter);

module.exports = app;