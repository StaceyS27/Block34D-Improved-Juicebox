const express = require('express');
const apiRouter = express.Router();

//Testing functionality of router
apiRouter.get('/', (req, res, next)=> {
    res.send("This is the apiRouter")
});


const postsRouter = require("./posts");
apiRouter.use('/posts', postsRouter);






module.exports = apiRouter;
