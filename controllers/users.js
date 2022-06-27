require('dotenv').config();
const User = require('../models/user').default;
const { generateQRCode, uploadImage, sendWhatsappMessage, comparePassword, generateInvitation } = require('../helpers');
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const fs = require('fs')

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

        // check user already exists or no
        let user = new User('', name, phone_number);
        const isExists = await user.userAlreadyExists();
        if (isExists) {
            return response.error(res, 'phone-number-already-exists')
        }
        
        let qrCodeURL = '';      
        if (process.env.NODE_ENV !== 'test') {
            // generate QR Code
            const { filePath: qrFilePath, filename } = await generateQRCode(phone_number, name);
            // store image bucket
            const qrImageBase64 = fs.readFileSync(qrFilePath, 'base64');            
            const qrImage = await uploadImage(qrImageBase64, `qr-${phone_number}`);
            qrCodeURL = qrImage.url;
            // generate invitation
            const invitationPath = await generateInvitation({ name, department, branches }, filename);
            const invitationImageBase64 = fs.readFileSync(invitationPath, 'base64');
            // store to image bucket
            const invitationImage = await uploadImage(invitationImageBase64, phone_number);
            // send whatsapp
            const from = `${process.env.WHATSAPP_FROM_NUMBER}`;
            const to = `${process.env.WHATSAPP_TO_NUMBER}`;

            await sendWhatsappMessage(invitationImage.url, to, from)            
        }
        if (process.env.NODE_ENV === 'test') {
            qrCodeURL = 'dummy_url.png';
        }

        user = new User('', name, phone_number, '', department, branches, transportation, 1, family_list, qrCodeURL, 0, 0); 
        await user.create();
        return response.upsert(res, user, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { phone_number, password } = req.body;

        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }
        if(!password) {
            return response.falseRequirement(res, 'password');
        }

        const user = new User('', '', phone_number, password);
        const result = await user.login();
        if(!result) {
            return response.loginFailed(res);
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return response.loginFailed(res);
        }

        
        const token = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.loginSuccess(res, user, token);


    } catch(error) {        
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    createUser,
    loginUser
};