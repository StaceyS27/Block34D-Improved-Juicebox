const app = require('../app')
const request = require('supertest');
const jwt = require('jsonwebtoken');

const prismaMock = require('../mocks/prismaMock');
jest.mock('jsonwebtoken');

describe('/api/posts', () => {
    describe('GET /api/posts', () => {
        it('returns all posts', async () => {
            const posts = [
                {id: 1, title: "Test", content: "Test", userId: 1},
                {id: 2, title: "Test", content: "Test", userId: 1}
            ];

            prismaMock.posts.findMany.mockResolvedValue(posts);
            
            const response = await request(app).get('/api/posts');
            
            expect(response.body[0]).toEqual(posts[0]);
            expect(response.body[1]).toEqual(posts[1]);
        })
    })

    describe('POST /api/posts', () => {
        it('creates new post', async () => {
            const user = {
                id: 123,
            }
        
            const newPost = {
                id: 5,
                title: "Hanging Out",
                content: "I enjoy the sun",
                userId: user.id     
            };

            jwt.verify.mockReturnValue({id: user.id})
            prismaMock.users.findUnique.mockResolvedValue(user)
            prismaMock.posts.create.mockResolvedValue(newPost);

            const response = await request(app)
            .post('/api/posts')
            .set('Authorization' ,'Bearer fakeToken')
            .send(newPost);

            console.log(response.body)
            console.log(response.status)
        
            expect(response.body.title).toEqual(newPost.title);
            expect(response.body.content).toEqual(newPost.content);
            expect(response.body.userId).toEqual(newPost.userId);

            expect(prismaMock.posts.create).toHaveBeenCalledTimes(1);
        })
    })
})

describe('/api/posts/:postId', () => {
    describe('GET /api/posts/:postId', () => {
        it('returns a single post', async () => {
            const singlePost = {
                id: 4,
                title: "Summer",
                content: "The summer is my favorite season!",
                userId: 2
            };

            prismaMock.posts.findUnique.mockResolvedValue(singlePost);

            const response = await request(app).get(`/api/posts/${singlePost.id}`);

            expect(response.body.id).toEqual(singlePost.id);
            expect(response.body.title).toEqual(singlePost.title);
            expect(response.body.content).toEqual(singlePost.content);
            expect(response.body.userId).toEqual(singlePost.userId)
        })
    });

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjk4ODYzMzIwfQ.Rxen6TvyWyl8BvKNQGVBYPSbeZx04px7m9BKXi5hzM8'
    describe('PUT /api/posts/:postId', () => {
        it('updates a single post', async() => {
            const updatedPost = {
                id: 19,
                title: "Hanging Out!!",
                content: "I enjoy the sun!!",
                userId: 8
            };

            prismaMock.posts.update.mockResolvedValue(updatedPost);

            const response = await request(app)
            .put(`/api/posts/${updatedPost.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedPost);


            expect(response.body.post.title).toEqual(updatedPost.title);
            expect(response.body.post.content).toEqual(updatedPost.content);
            expect(response.body.post.userId).toEqual(updatedPost.userId)
        })
    })

    describe('DELETE /api/posts/:postId', () => {
        
        it('deletes a single post', async() => {
            const deletedPost = {
                id: 26,
                title: "Hanging Out",
                content: "I enjoy the sun",
                userId: 8
            };
            
            prismaMock.posts.delete.mockResolvedValue(deletedPost);

            const response = await request(app)
            .delete(`/api/posts/${deletedPost.id}`)
            .set('Authorization', `Bearer ${accessToken}`)

            console.log("DEBUGGING....")
            console.log(response)

            expect(response.body.Post.title).toEqual(deletedPost.title);
            expect(response.body.Post.content).toEqual(deletedPost.content);
            expect(response.body.Post.userId).toEqual(deletedPost.userId)

        })
    })
})
