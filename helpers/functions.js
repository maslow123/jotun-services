exports.normalizedPhoneNumber = (phoneNumber) => {
    // remove special characters
    phoneNumber = phoneNumber.trim().replace(/[^a-zA-Z0-9 ]/g, '');
    if (phoneNumber[0] === '0') {
        phoneNumber = phoneNumber.replace('0', '62');
    }
    
    return phoneNumber;
};

exports.checkAgeIsValid = (categoryAge, childAge) => {
    const age = Number(childAge);
    const isBetween = categoryAge.includes('-');    
    
    if (isBetween) {
        const arrCategoryAge = categoryAge.trim().split('-');
        const from = Number(arrCategoryAge[0]);
        const to = Number(arrCategoryAge[1]);        
        
        if ((age >= from) && (age <= to)) {
            return true;
        }
        return false;
    }
    categoryAge = Number(categoryAge);

    return (age === categoryAge);
}