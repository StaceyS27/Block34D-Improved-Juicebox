const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan("dev"))


//test functionality of the app server
app.get('/', async (req, res, next) => {
    res.send('Hello Express')
});



app.use(express.json());

const apiRouter = require('./api');
app.use('/api', apiRouter);

const authRouter = require('./auth');
app.use('/auth', authRouter);

module.exports = app;