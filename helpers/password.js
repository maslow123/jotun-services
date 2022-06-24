const bcrypt = require('bcrypt');

exports.generatePassword = async () => {        
    const password = Math.random().toString(36).slice(2, 15);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return { password, hashedPassword };
};

exports.comparePassword = async (userPassword, hashedPassword) => {
    return await bcrypt.compare(userPassword, hashedPassword);
};