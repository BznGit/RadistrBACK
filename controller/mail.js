const mailService = require('../services/mail');
const nodemailer = require('nodemailer');
const api = require('../api/api');
require('dotenv').config();

async function sendMail(req, res) {

  console.log('mail=>',req.fields)
 const { email, user, text, 'g-recaptcha-response': captcha } = req.fields
 console.log('>',captcha)
 let resCatcha = '';
switch(captcha){
    case process.env.PUBLIC_KEY: resCatcha = await api.getCaptcha(captcha); // openmining
  break;
    case process.env.PUBLIC_KEY2: resCatcha = await api.getCaptcha2(captcha);// radistr
  break;
}
 
 console.log(resCatcha.success)
 if(resCatcha.success){
    try {
        let smtpTransport;
  
        try {
          smtpTransport = nodemailer.createTransport({
            host: 'p3plzcpnl503556.prod.phx3.secureserver.net',
            port: process.env.SMPTPORT,
            secure: true,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
        } catch (e) {
          return console.log('Error: ' + e.name + ":" + e.message);
        }
      
        let mailOptions = {
          from: 'no-reply@openmining.org', // sender address
          to: [ 'info@openmining.org','bznkvlx@yandex.ru' ], // list of receivers
          subject: 'Обращение с сайта openmining.org', // Subject line
          text: 'Обращение с сайта openmining.org', // plain text body
          html: `<div>Почта: ${email}</div>
                <div>Имя: ${user}<div>
                <div>Сообщение: ${text}<div>` // html body
        };
      console.log('mail->')
      smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          // return console.log(error);
          return console.log('Error->', error);
        } else {
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send({captcha: true})
      
        }
        res.render('feed-ok', { msg: 'В ближайшее время мы с Вами свяжемся и ответим на все вопросы' });
        res.redirect('http://baedeker.club');
      })

    } catch(err) {
        console.error(err);
        res.status(401).json(err);
    }
  } else{
    console.log('bot')
  
    res.status(401).json({captcha: false});
    res.send()
  }
}

module.exports = {
    sendMail
};