'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

// https://nodemailer.com/smtp/oauth2/

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS // generated ethereal password
  }
});

const mailer = {
  sendWelcomeEmail: recipient => {

    const welcomeEmail = {
      from: '"Response.io" <' + process.env.EMAIL_FROM + '>', // sender address
      to: recipient, // list of receivers
      subject: 'Thank You for Registering!', // Subject line
      text: 'Thank you for creating a new account with us! We\'re pleased to have you.', // plain text body
      html: '<b>Thank you for creating a new account with us! We\'re pleased to have you.</b>' // html body
    }

    transporter.sendMail(welcomeEmail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = mailer;