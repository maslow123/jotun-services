require('dotenv').config();
const User = require('../models/user').default;

const response = require('../helpers/response');

const createUser = async (req, res) => {
    try {        
        const { name, phone_number, department, branches, transportation, level, family_list } = req.body;  
             
        if(!name) {
            return response.falseRequirement(res, 'name');
        }    
        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }
        if(!department) {
            return response.falseRequirement(res, 'department');
        }
        if(!branches) {
            return response.falseRequirement(res, 'branches');
        }
        if(!transportation) {
            return response.falseRequirement(res, 'transportation');
        }
        if(!level) {
            return response.falseRequirement(res, 'level');
        }
        if(!family_list || family_list.length < 1) {
            return response.falseRequirement(res, 'family_list');
        }

        let user = new User('', name, phone_number, '', department, branches, transportation, 1, family_list, 0, 0);
        await user.create();

        return response.upsert(res, user, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
}
module.exports = {
    createUser,
};