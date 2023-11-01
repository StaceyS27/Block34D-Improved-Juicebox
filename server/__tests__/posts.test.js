const app = require('../app')
const request = require('supertest');

const prismaMock = require('../mocks/prismaMock');

describe('/api/posts', () => {
    describe('GET /api/posts', () => {
        it('returns all posts', async () => {
            const posts = [
                {id: 1, title: "Happy Home", content: "I am happy when I am home with my family", userId: 1},
                {id: 2, title: "I love Walking", content: "Walking is best when done with music", userId: 1}
            ];

            prismaMock.posts.findMany.mockResolvedValue(posts);
            
            const response = await request(app).get('/api/posts');
            console.log("DEBUGGIN....")
            console.log(response.body)
            
            expect(response.body[0]).toEqual(posts[0]);
            expect(response.body[1]).toEqual(posts[1]);
        })
    })
})