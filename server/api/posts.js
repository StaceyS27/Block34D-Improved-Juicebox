const express = require('express');
const postsRouter = express.Router();

//test functionality of endpoint
postsRouter.get('/', (req, res, send) => {
    res.send("POSTS ROUTER!!")
});




module.exports = postsRouter; 