require('dotenv').config();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const User = require('../models/user').default;
const response = require('../helpers/response');
const storeImage = require('../helpers/store-image');
const { sendWhatsappMessage } = require('../helpers/send-message');

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
        if (process.env.NODE_ENV !== 'test') {
            // generate QR Code
            const QRImageURL = await generateQRCode(phone_number, name);
            // store to image bucket
            const imageResp = await storeImage.uploadImage(QRImageURL, user.id);
            // send QR to whatsapp number
            await sendWhatsappMessage(imageResp.url);
        }
        return response.upsert(res, user, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
}

const generateQRCode = async (phone_number, name) => {
    const opts = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
        color: {
         dark: '#208698',
         light: '#FFF',
        },
    }
    const encryptedData = jwt.sign(
        { phone_number, name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
        
    return await QRCode.toDataURL(encryptedData, opts);

}
module.exports = {
    createUser
};