const request = require('supertest');
const app = require('../index.js');
describe('Users API', () => {
    it('should create user', async () => {  
        const slug = `/api/v1/user/register`;
        const payload = {
            name: '', 
            phone_number: '', 
            department: '',
            branches: '',
            transportation: '',
            level: 1,
            family_list: ''
        }     
        res = await request.agent(app)
                        .post(slug)
                        .send(payload);
        resBody = res.body;
        // invalid field
        expect(res.statusCode).toEqual(500);
        expect(resBody.message).toEqual('invalid-name');
        
        payload.name = 'Josse mourinho';
        res = await request.agent(app)
                        .post(slug)
                        .send(payload);
        resBody = res.body; 
        expect(resBody.message).toEqual('invalid-phone_number');

        payload.phone_number = '0878111111111';
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.message).toEqual('invalid-department');

        payload.department = 'IT';
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.message).toEqual('invalid-branches');

        payload.branches = 'New York City';
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.message).toEqual('invalid-transportation');

        payload.transportation = 'Mobil';
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.message).toEqual('invalid-family_list');

        
        payload.family_list = ['Istri', 'Anak 1', 'Anak 2'];
        res = await request.agent(app)
                        .post(slug)                        
                        .send(payload);
        resBody = res.body; 
        expect(resBody.code).toEqual(201);
        expect(resBody.message).toEqual('data successfully created');
    });
});