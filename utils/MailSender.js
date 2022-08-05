var nodemailer = require('nodemailer');


class MailSenderService {
  constructor() { }

  async sendEmail(email, subject, text) {
    console.log('------entro-----')

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nebulosaretail@gmail.com',
        pass: 'rxhekycdvstqwaqk'
      }
    });

    var mailOptions = {
      from: 'nebulosaretail@gmail.com',
      to: email,
      subject: subject,
      text: text
    };
console.log(mailOptions)
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = MailSenderService;
