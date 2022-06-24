require('dotenv').config();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');

exports.generateQRCode = async (phone_number, name) => {    
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
};

