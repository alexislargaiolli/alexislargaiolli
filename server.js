"use strict";
// server.js
const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use(bodyParser.json())
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD
  }
});

app.post('/contact', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const content = req.body.content;
  if (name === undefined || email === undefined || content === undefined) {
    return res.sendStatus(500);
  }
  var message = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_MAIL,
    subject: `${name} vous a contacté`,
    html: `<p>Vous avez reçu un message de <strong>${name}</strong> (email : <strong>${email}</strong>${tel ? ', Tél : <strong>' + tel + '</strong>': ''})</p>
    <p>${content}</p>`
  };
  transporter.sendMail(message, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error while sending mail.');
    }
    res.send({});
  });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Running server on port %s', port);
});
