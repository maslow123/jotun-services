const { writeLogs } = require('./write-logs');

require('dotenv').config();
const axios = require('axios').default;

exports.sendWhatsappMessage = async (imageURL, to, name) => {    
  const domain = process.env.WABLAS_DOMAIN;
  
  let bodyFormData = new URLSearchParams();
  // to = '6281901266101';
  bodyFormData.append('phone', to);
  bodyFormData.append('caption', `Hi ${name}. Terima kasih telah berpartisipasi dalam acara JOTUN Family Day 2022. Harap bawa Kode QR ini saat kedatangan anda.`);
  bodyFormData.append('image', imageURL);

  try {
    const resp = await axios.post(`${domain}/api/send-image`, bodyFormData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.WABLAS_API_KEY
      }
    });
    return resp
  } catch(err) {
    console.log(err);
    writeLogs(`Error send whatsapp message to ${to}\t[${err.response.data.message}]`);
  }
};

