require('dotenv').config();
const Vonage = require('@vonage/server-sdk');
const WhatsAppImage = require('@vonage/server-sdk/lib/Messages/WhatsAppImage');

exports.sendWhatsappMessage = async (imageURL, to, from) => {    
    const nexmo = new Vonage({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET,
        applicationId: process.env.NEXMO_APPLICATION_ID,
        privateKey: `${__dirname}${process.env.NEXMO_PRIVATE_KEY_PATH}`,
      }, {
        apiHost: process.env.NEXMO_API_HOST
      }
    );
    const caption = 'Simple caption';
    return new Promise((resolve, reject) => {
      nexmo.messages.send(
        new WhatsAppImage({ url: imageURL, caption }, to, from),
        (err, d) => {
          if (err) { return reject(err) }
          return resolve(d)
        }
      );
    })
};

