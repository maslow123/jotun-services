require('dotenv').config();
const Vonage = require('@vonage/server-sdk');
const WhatsAppImage = require('@vonage/server-sdk/lib/Messages/WhatsAppImage');

exports.sendWhatsappMessage = async (imageURL) => {    
    const nexmo = new Vonage({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET,
        applicationId: process.env.NEXMO_APPLICATION_ID,
        privateKey: `${__dirname}${process.env.NEXMO_PRIVATE_KEY_PATH}`,
      }, {
        apiHost: process.env.NEXMO_API_HOST
      }
    );

    const data = await nexmo.messages.send(new WhatsAppImage({ url: imageURL }, '6287803824644', '14157386102'));
    return data;
};

