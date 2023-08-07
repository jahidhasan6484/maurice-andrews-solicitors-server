const express = require("express");
const cors = require("cors");
const app = express();

// Using cors
app.use(cors());

// Parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
