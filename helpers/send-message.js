const { writeLogs } = require('./write-logs');

require('dotenv').config();
const axios = require('axios').default;

exports.sendWhatsappMessage = async (imageURL, to, name) => {    
  const domain = process.env.WABLAS_DOMAIN;
  
  let bodyFormData = new URLSearchParams();
  // to = '6281901266101';
  bodyFormData.append('phone', to);
  bodyFormData.append('caption', `Halo ${name}. Anda diundang untuk menghadiri JOTUN EVENT 2022 omamaolala.xyz`);
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

