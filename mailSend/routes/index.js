var express = require('express');
var router = express.Router();
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

/* GET home page. */
router.get('/', function(req, res, next) {

// 补充 author 代码


const author = {
  host: 'smtp.163.com', //用的126邮箱
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
      user: 'XX@163.com',  //使用自己的邮箱名；
      pass: 'password'  //使用自己的密码；
    }
};

const transporter = mailer.createTransport(smtpTransport(author)); 
// 补充mailOptions代码。
const mailOptions = {
     from:'XX@163.com',
     to : 'XX@163.com',
     subject :'测试nodeMailer邮件发送功能',
     html :'<p>HI ，亲爱高阳老师 </p>' +
    '<p> 我正在测试 nodeMailer 发送邮件的功能,收到邮件请不要惊讶，哈哈哈哈！！！</p>'
 };


transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
  
  res.render('index', { title: 'Express' });


});

module.exports = router;
