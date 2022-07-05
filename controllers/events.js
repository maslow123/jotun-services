require('dotenv').config();
const Event = require('../models/event').default;
const SubEvent = require('../models/sub-event').default;
const response = require('../helpers/response');

const createEvent = async (req, res) => {
    try {        
        const { name, category_age } = req.body;  
             
        if(!name) {
            return response.falseRequirement(res, 'name');
        }     
        if(!category_age) {
            return response.falseRequirement(res, 'category_age');
        }        
        if (!banner) {
            return response.falseRequirement(res, 'banner');
        }    

        let event = new Event('', name, category_age, banner);
        await event.create();       

        // for tmp, auto create sub event for 1 rows
        let sub_event = new SubEvent('', event.id, '2022-06-24 10:00:00', '2022-06-24 10:30:00', 99);
        sub_event.create();

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