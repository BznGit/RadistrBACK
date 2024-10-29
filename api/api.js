const axios = require('axios');
require('dotenv').config();
console.log(process.env.SECRET_KEY2)
async function getExchange(){
    let data = null;
    try{
      await axios.get('https://stats.cryptonex.org/get_rate_list' , {agent:false}).then(res => {
        data = res.data.rates.find(item => item.alias === "BTC/USD")
      })
    }catch(err){
      console.log('Api getExchange reguest error!');
    
    }
    return data;  
};

async function getExchangeList(){
  let data = null;
  console.log('getExchangeList start---')
  try{
    await axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000&aggregate=1&e=CCCAGG').then(res => {
      data = res.data.Data.Data
    })
  }catch(err){
    console.log('Api getExchangeList reguest error!');
  }
  return data;  
};

async function getGeneralBtc(){
  let obj = null;
  try{
    await axios.get('http://136.243.156.190:8888/general'  ,{agent:false}).then(res => {
      obj = res.data;
    })
  }catch(err){
    console.log('Api OneNode reguest error!');
  }
  return obj;  
};

async function getDiffBtcDaily(height){
  let obj = null;
  try{
    await axios.get('http://136.243.156.190:8888/dailyNetworkChart/' + height  ,{agent:false}).then(res => {
      obj = res.data;
    })
  }catch(err){
    console.log('Api daily reguest error!');
  }
  return obj;  
};


async function getCaptcha(captcha){
  let obj = null;
  try{
    await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`).then(res => {
      obj = res.data;
    })
  }catch(err){
    console.log('Api OneNode reguest error!');
  }
  return obj;  
};


async function getCaptcha2(captcha){
  let obj = null;
  try{
    await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY2}&response=${captcha}`).then(res => {
      obj = res.data;
    })
  }catch(err){
    console.log('Api OneNode reguest error!');
  }
  return obj;  
};
async function countdown(seconds) {
  const interval = setInterval(() => {
      console.clear(); // Очистка консоли
      console.log(`Осталось: ${seconds} секунд`);

      if (seconds <= 0) {
          clearInterval(interval);
          console.log("Время вышло!");
      }
      seconds--;
  }, 1000); // Интервал в 1 секунду
}


module.exports = {
    getExchange,
    getGeneralBtc,
    getCaptcha,
    getCaptcha2,
    getDiffBtcDaily,
    getExchangeList
    
};