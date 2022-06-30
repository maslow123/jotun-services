exports.normalizedPhoneNumber = (phoneNumber) => {
    // remove special characters
    phoneNumber = phoneNumber.trim().replace(/[^a-zA-Z0-9 ]/g, '');
    if (phoneNumber[0] === '0') {
        phoneNumber = phoneNumber.replace('0', '62');
    }
    
    return phoneNumber;
};