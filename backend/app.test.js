import app from './app.js'
import request from 'supertest'

// app.get('/', (req, res) => res.send({ info: 'Journal API' }))
describe('App Test', () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })

    test('POST /entries', async () => {
        const cats = await request(app).get('/categories')
        const res = await request(app).post('/entries').send({
            category: cats.body[0]._id,
            content: 'Jest test content'
        })

        expect(res.status).toBe(201)
        expect(res.header['content-type']).toContain('json')

        request(app).delete(`/entires/${res.body._id}`)
    })

    describe('GET / categories', () => {
        let res 

        beforeEach(async () => {
            res = await request(app).get('/categories')
        })

        test('Returns JSON content', () => {
            expect(res.status).toBe(200)
            expect(res.header['content-type']).toContain('json')
        })

        test('Returns an array', () => {
            expect(res.body).toBeInstanceOf(Array)
        })
        test('Array has 4 elements', () => {
            expect(res.body).toHaveLength(4)
        })
        test('Food', () => {
            expect(res.body[0].name).toBe('Food')
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Gaming" })]))
        })
    })


})