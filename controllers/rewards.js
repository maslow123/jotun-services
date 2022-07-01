require('dotenv').config();
const Rewards = require('../models/rewards').default;
const response = require('../helpers/response');

const createReward = async (req, res) => {
    try {        
        const { user_id, item } = req.body;  
             
        if(!user_id) {
            return response.falseRequirement(res, 'user_id');
        }     
        if(!item) {
            return response.falseRequirement(res, 'item');
        }            

        let rewards = new Rewards('', user_id, item);
        await rewards.create();       
        return response.upsert(res, rewards, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const getRewards = async (req, res) => {
    try {
        const rewards = new Rewards();    
        const results = await rewards.list();

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
    createReward,
    getRewards
};