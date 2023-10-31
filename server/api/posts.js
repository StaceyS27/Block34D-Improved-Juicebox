const express = require('express');
const postsRouter = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { requireUser } = require('./utils');

//GET /api/posts - get all posts
postsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await prisma.posts.findMany();
        console.log(posts)
        res.send(posts)
    } catch (error) {
        next()
    }
});

//GET /api/posts/:postId - get single post
postsRouter.get("/:postId", async(req, res, next) => {
    try {
        const singlePost = await prisma.posts.findUnique({
            where: {
                id: Number(req.params.postId)
            }
        })
        res.send(singlePost)
    } catch (error) {
        res.send("unable to get single post.")
    }
})

postsRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const newPost = await prisma.posts.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id
            }
        })
        res.json({
            message: "New post created!", 
            Post: newPost
        })
    } catch (error){
        res.status(401).send("unable to make post.")
    }
 })




module.exports = postsRouter; 