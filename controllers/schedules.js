require('dotenv').config();
const Schedule = require('../models/schedule').default;
const response = require('../helpers/response');

const createSchedules = async (req, res) => {
    try {        
        const { date, zoom_link, schedule_list } = req.body;  
             
        if(!date) {
            return response.falseRequirement(res, 'date');
        }            
        if(!zoom_link) {
            return response.falseRequirement(res, 'zoom_link');
        }            
        if(!schedule_list || schedule_list.length < 1) {
            return response.falseRequirement(res, 'schedule_list');
        }            

        let schedules = new Schedule('', date, zoom_link, schedule_list);
        await schedules.create();       
        return response.upsert(res, schedules, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const getSchedules = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return response.falseRequirement(res, 'date');
        }
        const schedules = new Schedule('', date);    
        const results = await schedules.list();

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
    createSchedules,
    getSchedules
};