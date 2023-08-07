const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "salmanshah11062019@gmail.com",
    pass: "qdzowfvjtzhknaqr",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = transport;
