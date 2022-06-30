require('dotenv').config();
const ConfirmInvitation = require('../models/confirm-invitation').default;
const User = require('../models/user').default;
const { sendWhatsappMessage, normalizedPhoneNumber } = require('../helpers');
const response = require('../helpers/response');

const resendConfirmInvitaion = async (req, res) => {
    try {        
        let { phone_number } = req.body;  
             
        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }                                 
        
        phone_number = normalizedPhoneNumber(phone_number);
        const confirm_invitation = new ConfirmInvitation('', '', phone_number);
        const resp = await confirm_invitation.update();       
        if (resp !== 'OK') {
            return response.error(res, resp);
        }
        // get user data
        const user = new User('', '', phone_number);
        await user.login();

        // resend invitation based on phone number
        const imageInvitationURL = `${process.env.IMAGE_URL}inv-${phone_number}.png`;
        await sendWhatsappMessage(imageInvitationURL, phone_number, user.name);
        return response.upsert(res, 'OK', 'sended');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    resendConfirmInvitaion
};