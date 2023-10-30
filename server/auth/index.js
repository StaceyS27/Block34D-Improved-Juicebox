const express = require('express');
const authRouter = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//test functionality of router
authRouter.get('/', (req, res, next)=> {
    res.send("Auth Router!");
});

//GET /auth/users - get all users
authRouter.get('/users', async(req, res, next) => {
    try{
        const users = await prisma.users.findMany();
        res.send(users)
    } catch(error) {
        res.send("unable to get all users")
    }
});



module.exports = authRouter