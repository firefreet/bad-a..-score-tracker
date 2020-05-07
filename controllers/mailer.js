'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

const fromStr = `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

const mailer = {
  sendWelcomeEmail: recipient => {

    const welcomeEmail = {
      from: fromStr, // sender address
      to: recipient, // list of receivers
      subject: 'Thank You for Registering!', // Subject line
      text: `Thank you for creating a new account with us! We're pleased to have you.`, // plain text body
      html: `<p>Thank you for creating a new account with us! We're pleased to have you.</p>` // html body
    }

    transporter.sendMail(welcomeEmail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  },

  sendPassReset: (id, recipient, bufStr) => {
    const resetEmail = {
      from: fromStr,
      to: recipient,
      subject: 'Response.io: Reset your password.',
      text: `You're receiving this email because you've requested a password reset from Response.io.
            Please copy the following link and paste it into your browser in order to reset your password:
            ${process.env.HOST_URL}/passreset/${id}/${bufStr}`,
      html: `<p>You're receiving this email because you've requested a password reset from Response.io.
            Please click on <a href="${process.env.HOST_URL}/passreset/${id}/${bufStr}" target="_blank" rel="noopener noreferrer">this link</a>,
            or copy the following link text and paste it into your browser in order to reset your password:
            ${process.env.HOST_URL}/passreset/${id}/${bufStr}`
    }

    transporter.sendMail(resetEmail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(process.env.HOST_URL);
        console.log(info);
      }
    })
  }
}

module.exports = mailer;