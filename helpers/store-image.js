require('dotenv').config();
const ImageKit = require('imagekit');

exports.uploadImage = async (base64Image, userId) => {
    const imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUB_KEY,
        privateKey: process.env.IMAGEKIT_PRI_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL
    });

    const response = await imageKit.upload({
        file: base64Image,
        fileName: `user-${userId}.jpg`,
        isPrivateFile: false
    });

    return response;
};