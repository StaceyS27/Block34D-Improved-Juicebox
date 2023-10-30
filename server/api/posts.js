const express = require('express');
const postsRouter = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//GET /api/posts - get all posts
postsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await prisma.posts.findMany();
        res.send(posts)
    } catch (error) {
        res.send("unable to get posts")
    }
});




module.exports = postsRouter; 