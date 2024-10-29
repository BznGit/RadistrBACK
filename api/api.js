const axios = require('axios');
require('dotenv').config();

async function getCaptcha(captcha){
  let obj = null;
  try{
    await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`).then(res => {
      obj = res.data;
    })
  }catch(err){
    console.log('Api getCaptcha reguest error!');
  }
  return obj;  
};

module.exports = {
  getCaptcha
   
};