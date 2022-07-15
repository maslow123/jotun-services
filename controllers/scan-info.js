require('dotenv').config();
const ScanInfo = require('../models/scan-info').default;
const Family = require('../models/family').default;
const User = require('../models/user').default;
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const constants = require('../helpers/constants');

const updateScanInfo = async (req, res) => {
    try {        
        const { key, code } = req.body;      
        if(!key) {            
            return response.falseRequirement(res, 'key');
        }
        // decoded jwt to get user data        
        const decoded = jwt.verify(key, process.env.JWT_SECRET, {
            ignoreExpiration: true
        });
        if (!decoded) {
            return response.falseRequirement(res, 'key');
        }

        const { phone_number } = decoded;

        // get user data based on phone_number
        const user = new User('', '', phone_number);
        const isValid = await user.login();
        if (!isValid) {
            return response.errorScan(res, 'invalid-qr-code');
        }

        const data = {
            user,
            children: []
        };
        // get scan items
        const scan_info = new ScanInfo('', user.id, code);
        const items = await scan_info.list();
        if (items.length < 1) {
            return response.errorScan(res, 'items-not-found');
        }

        if (code !== constants.SCAN_CODE.KEHADIRAN) {
            // check status kehadiran is scanned or not.
            const kehadiran = items.find(item => item.code === constants.SCAN_CODE.KEHADIRAN);
            if (kehadiran?.status === 0) {
                return response.errorScan(res, 'invalid-attendance', data);
            }
        }
        const item = items.filter(item => item.code === code);
        if(item.length < 1) {
            return response.errorScan(res, 'invalid-code');
        } 

        // check valid children item
        let children = [];
        const family = new Family('', user.id);
        if (code === 'SNACK') {
            const startAge = 1;
            const endAge = 12;
            children = await family.checkValidChildren(startAge, endAge);    
        }
        if (code === 'PAKET_SEKOLAH') {
            const startAge = 3;
            const endAge = 18;
            children = await family.checkValidChildren(startAge, endAge);            
        }
        
        if (children.length < 1 && (code === 'SNACK' || code === 'PAKET_SEKOLAH')) {
            return response.errorScan(res, 'invalid-children-age', data);
        }

        const state = item[0].status === 1 ? 'update' : 'new';
        const isSuccess = await scan_info.update();
        if (!isSuccess) {
            return response.errorScan(res, 'something wrong');
        }     
        
        data.children = children;    
        return response.successScan(res, state, data);
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    updateScanInfo,
};