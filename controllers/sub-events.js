require('dotenv').config();
const SubEvent = require('../models/sub-event').default;
const response = require('../helpers/response');

const createSubEvent = async (req, res) => {
    try {        
        const { event_id, start_time, end_time, slots } = req.body;  
             
        if(!event_id) {
            return response.falseRequirement(res, 'event_id');
        }            
        if(!start_time) {
            return response.falseRequirement(res, 'start_time');
        }            
        if(!end_time) {
            return response.falseRequirement(res, 'end_time');
        }           
        if(!slots) {
            return response.falseRequirement(res, 'slots');
        }             

        const sub_event = new SubEvent('', event_id, start_time, end_time, slots);
        await sub_event.create();       
        return response.upsert(res, sub_event, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    createSubEvent
};