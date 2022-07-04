require('dotenv').config();
const Master = require('../models/master').default;
const response = require('../helpers/response');
const redisClient = require('./redis');

const getMasterData = async (req, res) => {
    try {
        const client = await redisClient();
        const masterCache = await client.get('master');
        if (!masterCache) {

            let master = new Master('', '', 'master_departments');    
            const master_departments = await master.list();
    
            master = new Master('', '', 'master_branches');    
            const master_branches = await master.list();
            
            master = new Master('', '', 'master_transportations');    
            const master_transportations = await master.list();
    
            const results = {
                master_departments,
                master_branches,
                master_transportations
            };
            
            // set to redis
            await client.set('master', JSON.stringify(results));
            return response.success(res, results);
        }
        
        const results = JSON.parse(masterCache);
        return response.success(res, results);

    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    getMasterData
};