const express = require('express');
const apiRouter = express.Router();

//Testing functionality of endpoint
apiRouter.get('/', (req, res, next)=> {
    res.send("This is the apiRouter")
});


const postsRouter = require("./posts");
apiRouter.use('/posts', postsRouter);

const authRouter = require("./auth");
apiRouter.use('/auth', authRouter);




module.exports = apiRouter;
