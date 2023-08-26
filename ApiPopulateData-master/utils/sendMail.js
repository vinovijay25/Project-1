var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'mail.aalaninfotech.in',
  port: '465',
  secure:true,
  auth: {
    user: 'ce@aalaninfotech.in',
    pass: 'zlvP?m$}c?+t'
  }
});


async function SendMail(to_email,subject,html)
{
    var mailOptions = {
      from: 'ce@aalaninfotech.in',
      to: to_email,
      subject: subject,
      html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        
      }
    });
}

module.exports = SendMail;