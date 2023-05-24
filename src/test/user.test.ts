import app from '../routes/user-routes'
import request from 'supertest'

describe('POST /users/login', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).post('/users/login').send({
            phone: "584241797753",
            password: "tallentinext"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /users', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/users').send({})
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /users/:id', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/users/:id').query({
            id: 2
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /users', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).post('/users').send({
            name: "Luis Plaza",
            phone: "584241797753",
            email: "suilppm@gmail.com",
            address: "Los Teques, Miranda, Venezuela",
            password: "tallentinext"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('PUT /users/:id_user', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).put('/users/:id_user').query({
            id: 2
        }).send({
            name: "Luis Plaza",
            phone: "584241797753",
            email: "suilppm@gmail.com",
            address: "Los Teques, Miranda, Venezuela, tallenti",
            password: "tallentinext"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('Delete /users/:id_user', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).delete('/users/:id_user').query({
            id: 2
        })
        expect(response.statusCode).toBe(204)
    })
})