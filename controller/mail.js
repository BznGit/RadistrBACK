const mailService = require('../services/mail');
const nodemailer = require('nodemailer');
const api = require('../api/api');
require('dotenv').config();

async function sendMail(req, res) {

  console.log('mail=>', req.fields)
  const { email, user, text, 'g-recaptcha-response': captcha } = req.fields

 const resCaptcha = await api.getCaptcha(captcha);  

  console.log('>', resCaptcha)
  console.log(resCaptcha.success)
  if(resCaptcha.success){
    try {
        let smtpTransport;
        console.log(process.env.SMPTPORT)
        try {
          smtpTransport = nodemailer.createTransport({
            host: '127.0.0.1',
            port: process.env.SMPTPORT,

          });
        } catch (e) {
          return console.log('Error: ' + e.name + ":" + e.message);
        }
      
        let mailOptions = {
          from: 'no-reply@radistr.ru', // sender address
          to: [ 'sales@radistr.ru', 'bznkvlx@yandex.ru' ], // list of receivers
          subject: 'Форма обратной связи', // Subject line
          text: 'Форма обратной связи', // plain text body
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