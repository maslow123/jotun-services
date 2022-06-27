require('dotenv').config();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.generateQRCode = async (phone_number, name) => {       
    const encryptedData = jwt.sign(
        { phone_number, name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    
    const filePath = path.join(`${process.cwd()}/assets/qr-code/`, `${phone_number}.png`)
    return new Promise((resolve, reject) => {
        QRCode.toFile(
            filePath,
            encryptedData,
            {
                width: 200,
                height: 200
            },
            err => {
             if (err) return reject(err)
             console.log(`success`, '✓ Okay, Has successfully generate & save your qrcode.');
             return resolve({
                filename: `${phone_number}.png`,
                filePath
             });
            }
        )
    })
};
