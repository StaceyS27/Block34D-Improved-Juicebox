const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

const prismaMock = require('../mocks/prismaMock');

describe('Authentication', ()=> {
    beforeEach(()=> {
        jwt.sign.mockReset();
        bcrypt.hash.mockReset();
    });

    describe('/auth/register', () => {
        it('creates a new user and token', async () => {
            const hashedPassword = "hashedWithBycrypt"
               
            const newUser = {
                username: 'TestName',
                password: 'testPassword'
            }

            const newUserwithHashedPassword = {
                username: newUser.username,
                password: hashedPassword
            }
            const createdUser = {
                id: 2,
                username: newUser.username,
                password: hashedPassword
            }
            const token = "xyz";

            bcrypt.hash.mockResolvedValue(hashedPassword);
            prismaMock.users.create.mockResolvedValue(createdUser);
            jwt.sign.mockReturnValue(token);

            const response = await request(app)
            .post('/auth/register')
            .send(newUserwithHashedPassword);

            expect(response.body.newUser.username).toEqual(createdUser.username)
            expect(response.body.token).toEqual(token)
        })
    })
})