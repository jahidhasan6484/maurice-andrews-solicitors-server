const express = require("express");
const cors = require("cors");
const {
  sendEmail,
} = require("./app/modules/utils/nodemailer/nodemailer.controllers");
const app = express();

// Using cors
app.use(cors());

// Parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/email", sendEmail);

module.exports = app;
