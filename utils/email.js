const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter
  var transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '17ecd2daab5a85',
      pass: 'dd9386b9884f0b',
    },
  });

  //2) Define the email options
  const mailOptions = {
    from: 'AthleteTalk <athlete-talk.vercel.app>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html,
  };

  //3) Send the email😏
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
