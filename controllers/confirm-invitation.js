require('dotenv').config();
const ConfirmInvitation = require('../models/confirm-invitation').default;
const response = require('../helpers/response');

const resendConfirmInvitaion = async (req, res) => {
    try {        
        const { phone_number } = req.body;  
             
        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }                                 

        const confirm_invitation = new ConfirmInvitation('', '', phone_number);
        const resp = await confirm_invitation.update();       
        if (resp !== 'OK') {
            return response.error(res, resp);
        }
        return response.upsert(res, 'OK', 'sended');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    resendConfirmInvitaion
};