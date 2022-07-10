require('dotenv').config();
const UserEvent = require('../models/user-event').default;
const SubEvent = require('../models/sub-event').default;
const Family = require('../models/family').default;
const { checkAgeIsValid } = require('../helpers');
const response = require('../helpers/response');
const conn = require('./../models/index');

const createUserEvent = async (req, res) => {
    try {     
        const { family_id, sub_event_id } = req.body;
        if (!family_id) {
            return response.falseRequirement(res, 'family_id');
        }       
        if (!sub_event_id) {
            return response.falseRequirement(res, 'sub_event_id');
        }

        // check children is valid or not
        const { user_id } = req;
        const family = new Family(family_id, user_id);

        const children = await family.getFamilyByID();
        if (children.length < 1) {
            return response.notFound(res, 'children-not-found');
        }
        const child = children[0];

        // check sub event is valid or not
        const sub_events = new SubEvent(sub_event_id);
        const subEventData = await sub_events.getSubEventByID();
        if (subEventData.length < 1) {
            return response.notFound(res, 'sub-event-not-found');
        }
        const subEvent = subEventData[0];
        if (subEvent.slots < 1) {
            return response.error(res, 'insufficient-slots');
        }

        // check children already registered..
        const user_event = new UserEvent(user_id, family_id, sub_event_id);
        const alreadyRegistered = await user_event.checkChildrenRegistered();
        if (alreadyRegistered > 0) {
            return response.errorAl(res, 'children-already-registered', {
                childName: child.name,
                eventName: subEvent.event_name
            });
        }

        // check child age is qualify or not.
        const ageIsValid = checkAgeIsValid(subEvent.category_age, child.age);
        if (!ageIsValid) {
            return response.falseRequirement(res, 'children-age');
        }

        await conn.query('BEGIN');
        // insert to user events
        await user_event.create();

        // update slot event
        await sub_events.updateSlots(subEvent.id);

        await conn.query('COMMIT');
        return response.upsert(res, user_event, 'created');
    } catch (error) {
        
        await conn.query("ROLLBACK");
        console.error(error);
        response.internalError(res, error.message);
    }
};

const getUserEventBySubEventID = async (req, res) => {
    try {
        const { user_id } = req;
        const { sub_event_id } = req.params;

        const user_event = new UserEvent(user_id, '', sub_event_id);
        const userEventData = await user_event.getUserEvent();
        if (userEventData.length < 1) {
            return response.notFound(res, 'user-event-not-found');
        }   
        return response.success(res, userEventData);
    } catch(error) {
        console.error(error);
        return response.error(res, error.message)
    }
}

module.exports = {
    createUserEvent,
    getUserEventBySubEventID
};