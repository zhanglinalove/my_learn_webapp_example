// sendMail.js

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// 补充 author 代码

const author = {
    host:'smtp.163.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth:{
        user :'xx@163.com',
        pass :'xx'        
   }
};
const transporter = mailer.createTransport(smtpTransport(author)); 

let  mailOptions = {
     from:'xx@163.com',
     to:'收件人的邮箱,可以写多个',
     subject:'社区账号激活',
     html :'<p>宇宙第一帅气，lina，这么多年没见，还记得我吗？想我了吗？</p>' 

}


// 补充mailOptions代码。

transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });


