const { sendWhatsappMessage } = require('./send-message');
const { uploadImage } = require('./store-image');
const { generateQRCode } = require('./generate-qr');
const { generatePassword, comparePassword } = require('./password');
const { generateInvitation } = require('./generate-invitation');
const { normalizedPhoneNumber, checkAgeIsValid } = require('./functions');
const { writeLogs } = require('./write-logs');

module.exports = { 
    sendWhatsappMessage, 
    uploadImage, 
    generateQRCode,
    generatePassword,
    comparePassword,
    generateInvitation,
    normalizedPhoneNumber,
    checkAgeIsValid,
    writeLogs
};