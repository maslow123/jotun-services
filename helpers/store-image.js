require('dotenv').config();
// const ImageKit = require('imagekit');
const OSS = require('ali-oss')

const AliOssClient = () => {
    if (!(this instanceof AliOssClient)) {
        return new AliOssClient();
    }

    this.client = new OSS({
        accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        bucket: 'jotun-app',
        region: process.env.ALIBABA_CLOUD_REGION
    });
};

AliOssClient.prototype.uploadObject = async function (objectKey, file, options) {
    return await this.client.put(objectKey, file, options);
};

AliOssClient.prototype.uploadStreamObject = async function (objectKey, file, options = {}) {
    _.defaults(options, {
      useChunkedEncoding: true,
    });
  
    const stream = fs.createReadStream(file);
  
    if (options.useChunkedEncoding) {
      return await this.client.putStream(objectKey, stream, options);
    } else {
      const size = fs.statSync(file).size;
  
      return await this.client.putStream(objectKey, stream, _.assign(options, { contentLength: size }));
    }
};

exports.uploadImage = async (filePath) => {
    const ossClient = new AliOssClient();
    // ossClient.uploadObject('image.png', `${__dirname}/../assets/qr-code/${phoneNumber}.png`);
    const resp = await ossClient.uploadStreamObject('image.png', filePath);
    return resp;

};