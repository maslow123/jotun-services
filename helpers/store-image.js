require('dotenv').config();
const OSS = require('ali-oss');
const fs = require('fs')

class AliOssClient {
    constructor(){}
    
    uploadStreamObject = async function (objectKey, file) {
        const client = new OSS({
            accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
            accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
            bucket: process.env.ALIBABA_CLOUD_BUCKET,
            region: process.env.ALIBABA_CLOUD_REGION,
            endpoint: process.env.ALIBABA_CLOUD_ENDPOINT
        });
      
        const stream = fs.createReadStream(file);
        return await client.putStream(objectKey, stream);
    };

};

exports.uploadImage = async (filePath, filename) => {
    const ossClient = new AliOssClient();
    const resp = await ossClient.uploadStreamObject(filename, filePath);
    return resp;

};