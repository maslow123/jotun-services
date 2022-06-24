require('dotenv').config();
const UserEvent = require('../models/user-event').default;
const SubEvent = require('../models/sub-event').default;
const response = require('../helpers/response');

const createUserEvent = async (req, res) => {
    try {        
        const { data } = req.body;  
             
        if(!data || data.length < 1) {
            return response.falseRequirement(res, 'data');
        }                                 
        const user_event = new UserEvent(data);
        await user_event.create();       

        const listSubEventID = data.map(row => row.sub_event_id);

        // update slots user_events
        const sub_event = new SubEvent();
        await sub_event.updateSlots(listSubEventID);
        return response.upsert(res, user_event, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    createUserEvent
};