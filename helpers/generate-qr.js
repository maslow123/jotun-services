require('dotenv').config();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.generateQRCode = async (phone_number, name, uid) => {       
    const encryptedData = jwt.sign(
        { phone_number, name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    
    const filePath = path.join(`${process.cwd()}/assets/qr-code/`, `qr-${uid}.png`)
    return new Promise((resolve, reject) => {
        const opts = {
            width: 300,
            height: 300
        };

        QRCode.toFile(
            filePath,
            encryptedData,
            opts,    
            err => {
             if (err) { 
                return reject(err); 
            }
             console.log(`success`, '✓ Okay, Has successfully generate & save your qrcode.');
             const resp = {
                filename: `qr-${uid}.png`,
                filePath
             };
             return resolve(resp);
            }
        )
    })
};
