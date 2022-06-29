require('dotenv').config();
const axios = require('axios').default;

exports.sendWhatsappMessage = async (imageURL, to, from) => {    
  const domain = process.env.WABLAS_DOMAIN;
  
  let bodyFormData = new URLSearchParams();
  bodyFormData.append('phone', '6285880525153');
  bodyFormData.append('caption', 'Ini QR mu');
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
    throw new Error(err);
  }
};

