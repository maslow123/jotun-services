const { writeLogs } = require('./write-logs');

require('dotenv').config();
const axios = require('axios').default;

exports.sendWhatsappMessage = async (imageURL, to, name) => {    
  const domain = process.env.TAPTALK_URL;
  
  // let bodyFormData = new URLSearchParams();
  // to = '6281901266101';
  // bodyFormData.append('phone', to);
  // bodyFormData.append('caption', `Hi ${name}. Terima kasih telah berpartisipasi dalam acara JOTUN Family Day 2022. Harap bawa Kode QR ini saat kedatangan anda.`);
  // bodyFormData.append('image', imageURL);

  const channelID =  process.env.TAPTALK_CHANNEL_ID;
  const phone = to;
  const messageType = process.env.TAPTALK_CHANNEL_MESSAGE_TYPE;
  const body = imageURL;
  const caption = `Hi ${name}. Terima kasih telah berpartisipasi dalam acara JOTUN Family Day 2022. Harap bawa Kode QR ini saat kedatangan anda.\nhttps://bit.ly/3yRCr49`;

  const apiKey = process.env.TAPTALK_API_KEY;

  const payload = {
    channelID,
    phone,
    messageType,
    body,
    caption,
    withCase: true
  };

  try {
    const resp = await axios.post(
      domain, 
      payload, {
      headers: {
        'API-KEY': apiKey
      }
    });
    console.log('Whatsapp success...', resp.data.message);
    writeLogs(`Success send whatsapp message to ${to}\t[${resp.data.message}]`);

    return resp
  } catch(err) {
    console.log(err);
    writeLogs(`Error send whatsapp message to ${to}\t[${err.response.data.message}]`);
  }
};

