require('dotenv').config();
const User = require('../models/user').default;
const Family = require('../models/family').default;
const ConfirmInvitation = require('../models/confirm-invitation').default;
const ScanInfo = require('../models/scan-info').default;
const { generateQRCode, uploadImage, sendWhatsappMessage, comparePassword, generateInvitation, normalizedPhoneNumber, uniqueID } = require('../helpers');
const response = require('../helpers/response');
const constants = require('../helpers/constants');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {        
        let { name, phone_number, department, branches, transportation, level, family_list } = req.body;  
             
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
        if(level === '' || level === undefined) {
            return response.falseRequirement(res, 'level');
        }
        // if(!family_list || family_list.length < 1) {
        //     return response.falseRequirement(res, 'family_list');
        // }
        if (
            (branches === constants.BRANCH_CODE.JAKARTA_AND_TANGERANG) &&
            !transportation
        ) {
            return response.falseRequirement(res, 'transportation');
        }

        phone_number = normalizedPhoneNumber(phone_number);
        // check user already exists or no
        let user = new User('', name, phone_number);
        const isExists = await user.userAlreadyExists();
        if (isExists) {
            return response.error(res, 'phone-number-already-exists')
        }
        
        let qrCodeURL = '';   
        let invitationURL = '';

        if (process.env.NODE_ENV === 'test') {
            qrCodeURL = 'dummy_url.png';
        }

        
        user = new User('', name, phone_number, '', department, branches, transportation, 1, qrCodeURL, invitationURL, 0, 0); 
        await user.create();
        
        if (family_list?.length > 0) {
            const family = new Family('', user.id, family_list);
            await family.create();
        }

        const confirm_invitation = new ConfirmInvitation('', user.id, phone_number);
        await confirm_invitation.create();

        const scan_info = new ScanInfo('', user.id);
        await scan_info.create();
        
        
        if (process.env.NODE_ENV !== 'test' && (Number(branches) === constants.BRANCH_CODE.JAKARTA_AND_TANGERANG)) {
            const uid = uniqueID();
            // generate QR Code
            const { filePath: qrFilePath, filename } = await generateQRCode(phone_number, name, uid);
            
            // store qr image to bucket
            const qrImage = await uploadImage(qrFilePath, filename);
            qrCodeURL = qrImage.url;
            
            // generate invitation
            const fileNameInvitation = `inv-${uid}.png`;
            const invitationPath = await generateInvitation({ name, department, branches }, uid);
            // store e-invitation to bucket
            const invitationImage = await uploadImage(invitationPath, fileNameInvitation);
            invitationURL = invitationImage.url;
            // send whatsapp
            const to = phone_number;

            await sendWhatsappMessage(invitationImage.url, to, name)            
        }

        user.qr_code_url = qrCodeURL;
        user.invitation_url = invitationURL;
        // update user image
        await user.updateUserImage();

        return response.upsert(res, user, 'created');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        let { phone_number } = req.body;

        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }
        /* 
            If using password...
        */
        // if(!password) {
        //     return response.falseRequirement(res, 'password');
        // }

        phone_number = normalizedPhoneNumber(phone_number);
        const user = new User('', '', phone_number);
        const isValid = await user.login();
        if(!isValid) {
            return response.loginFailed(res);
        }

        const family = new Family('', user.id);
        const family_list = await family.list();

        user.family = family_list;
        /* 
            If using password...
        */
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
};

const list = async (req, res) => {
    try {
        const user = new User();
        const users = await user.list();        

        return response.success(res, users);
    } catch(err) {
        console.error(err);
        response.internalError(res, err.message);
    }
};

const updateUser = async (req, res) => {
    try {        
        let { id, name, phone_number, department, branches, transportation, level, family_list } = req.body;  
             
        if (!id) {            
            return response.falseRequirement(res, 'id');
        }
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
        if(level === '' || level === undefined) {
            return response.falseRequirement(res, 'level');
        }
        if (
            (branches === constants.BRANCH_CODE.JAKARTA_AND_TANGERANG) &&
            !transportation
        ) {
            return response.falseRequirement(res, 'transportation');
        }

        phone_number = normalizedPhoneNumber(phone_number);
        
        // update user
        const user = new User(id, name, phone_number, '', department, branches, transportation, level, '', '', '', '');
        await user.update();

        if (family_list.length > 0) {
            // update family
            const family = new Family('', user.id, family_list);
            await family.update();            
        }
        
        return response.upsert(res, user, 'updated');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const loginHelpdesk = async (req, res) => {
    try {
        let { phone_number, password } = req.body;

        if(!phone_number) {
            return response.falseRequirement(res, 'phone_number');
        }
        /* 
            If using password...
        */
        if(!password) {
            return response.falseRequirement(res, 'password');
        }

        phone_number = normalizedPhoneNumber(phone_number);
        const user = new User('', '', phone_number);
        const isValid = await user.login();
        if(!isValid) {
            return response.loginFailed(res);
        }
        /* 
            If using password...
        */
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
}

module.exports = {
    createUser,
    loginUser,
    qrValidate,
    list,
    updateUser,
    loginHelpdesk
};