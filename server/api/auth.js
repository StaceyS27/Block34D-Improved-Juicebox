const express = require('express');
const authRouter = express.Router();

//test functionality of this endpoint
authRouter.get('/', (req, res, next)=> {
    res.send("Auth Router!");
})


module.exports = authRouter