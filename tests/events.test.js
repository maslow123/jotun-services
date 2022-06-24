const request = require('supertest');
const app = require('../index.js');
describe('Events API', () => {
    it('should create event', async () => {  
        const slug = `/api/v1/event/create`;
        const payload = {
            name: ''
        };     

        res = await request.agent(app)
                        .post(slug)
                        .send(payload);
        resBody = res.body;
        // invalid field
        expect(res.statusCode).toEqual(500);
        expect(resBody.message).toEqual('invalid-name');
        
        // success create event
        payload.name = 'TEST LOMBA RANDOM'
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.code).toEqual(201);
        expect(resBody.message).toEqual('data successfully created');
    });
});