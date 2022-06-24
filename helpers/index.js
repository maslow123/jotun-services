const { sendWhatsappMessage } = require('./send-message');
const { uploadImage } = require('./store-image');
const { generateQRCode } = require('./generate-qr');
const { generatePassword, comparePassword } = require('./password');

module.exports = { 
    sendWhatsappMessage, 
    uploadImage, 
    generateQRCode,
    generatePassword,
    comparePassword
};