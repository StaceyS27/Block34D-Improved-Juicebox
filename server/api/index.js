const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const {JWT} = process.env;

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

//Testing functionality of router
apiRouter.get('/', (req, res, next)=> {
    res.send("This is the apiRouter")
});

//set "req.user"
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if(!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const {id} = jwt.verify(token, JWT);

            if (id) {
                req.user = await prisma.users.findUnique({
                    where: {
                        id: id
                    }
                })
                next();
            } else {
                next({
                    name: 'AuthorizationHeaderError',
                    message: 'Authorization token malformed'
                })
            }
        } catch (error) {
            res.send("Unable to verify ID")
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token must start with ' + prefix
        })
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set: ", req.user)
    }
    next()
});

const postsRouter = require("./posts");
apiRouter.use('/posts', postsRouter);


module.exports = apiRouter;
