require('dotenv').config();
const ScanInfo = require('../models/scan-info').default;
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const constants = require('../helpers/constants');

const updateScanInfo = async (req, res) => {
    try {        
        const { key, code } = req.body;  
        const LIST_CODE = Object.keys(constants.SCAN_CODE);
        const codeIsValid = LIST_CODE.includes(code.toUpperCase());

        if(!code || !codeIsValid) {
            return response.falseRequirement(res, 'code');
        }     
        if(!key) {            
            return response.falseRequirement(res, 'key');
        }

        // decoded jwt to get user data
        const decoded = jwt.verify(key, process.env.JWT_SECRET);
        if (!decoded) {
            return response.falseRequirement(res, 'key');
        }
        const { data } = decoded;
        const { id } = data;
        let scan_info = new ScanInfo('', id, code);

        const isSuccess = await scan_info.update();
        if (!isSuccess) {
            return response.error(res, 'something wrong');
        }       

        const rows = await scan_info.read();
        if (rows.length < 1) {
            return response.notFound(res, 'user-scan-info not found')
        }
        return response.upsert(res, rows[0], 'updated');
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

module.exports = {
    updateScanInfo,
};