const express = require('express');
const authRouter = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const jwt = require("jsonwebtoken");
const {JWT} = process.env


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

//POST /auth/register - post new user
authRouter.post('/register', async(req, res, next) => {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
        const user = await prisma.users.findUnique({
            where: {
                username: req.body.username,
            }
        })

        if(user) {
            res.send("A user by that username already exists")
        }

        const newUser = await prisma.users.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
        });

        const token = jwt.sign({id: newUser.id}, process.env.JWT);
        const responseMessage = "You have successfully registered! \n Token: " + token

        res.send(responseMessage);
    } catch(error) {
        res.send("unable to register")
    }
})


//POST /auth/login - login a previous user


module.exports = authRouter