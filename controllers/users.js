require('dotenv').config();
const User = require('../models/user').default;
const { generateQRCode, uploadImage, sendWhatsappMessage, comparePassword, generateInvitation } = require('../helpers');
const response = require('../helpers/response');
const constants = require('../helpers/constants');
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
        if(level === '' || level === undefined) {
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
            
            // store qr image to bucket
            const qrImageBase64 = fs.readFileSync(qrFilePath, 'base64');            
            const qrImage = await uploadImage(qrImageBase64, `qr-${phone_number}`);
            qrCodeURL = qrImage.url;
            
            // generate invitation
            const invitationPath = await generateInvitation({ name, department, branches }, filename);
            const invitationImageBase64 = fs.readFileSync(invitationPath, 'base64');
            // store e-invitation to bucket
            const invitationImage = await uploadImage(invitationImageBase64, phone_number);
            console.log({ invitationImage });
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
        const { phone_number } = req.body;

        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }
        // if(!password) {
        //     return response.falseRequirement(res, 'password');
        // }

        const user = new User('', '', phone_number);
        const result = await user.login();
        if(!result) {
            return response.loginFailed(res);
        }

        // const isValidPassword = await comparePassword(password, user.password);
        // if (!isValidPassword) {
        //     return response.loginFailed(res);
        // }
        
        
        const token = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.loginSuccess(res, user, token);


    } catch(error) {        
        console.error(error);
        response.internalError(res, error.message);
    }
};

const qrValidate = async (req, res) => {
    try {        
        const { key } = req.query;
        if (!key) {
            return response.falseRequirement(res, 'key');
        }

        // decoded jwt to get user data
        const decoded = jwt.verify(key, process.env.JWT_SECRET);
        if (!decoded) {
            return response.falseRequirement(res, 'key');
        }
        const { phone_number, name } = decoded;
        // check user is attend or not
        const user = new User('', '', phone_number);
        const rows = await user.checkUserAttend();
        if (rows.length < 1) {
            return response.notFound(res);
        }

        const row = rows[0];
        //  update attend status
        if (row.is_attend < 1) {
            await user.updateUserAttend(!row.is_attend)
        } 
        // check is_attend status  
        return response.success(res, constants.ATTEND(name, row.is_attend));

    } catch(error) {
        console.error(error);
        response.internalError(res, error.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    qrValidate
};