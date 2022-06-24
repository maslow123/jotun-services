require('dotenv').config();
const Event = require('../models/event').default;
const response = require('../helpers/response');

const createEvent = async (req, res) => {
    try {        
        const { name } = req.body;  
             
        if(!name) {
            return response.falseRequirement(res, 'name');
        }            

        let event = new Event('', name);
        await event.create();       
        return response.upsert(res, event, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const getEvents = async (req, res) => {
    try {
        const event = new Event();    
        const results = await event.list();

        if (results.length < 1) {
            return response.notFound(res);
        }

        return response.success(res, results);

    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    createEvent,
    getEvents
};