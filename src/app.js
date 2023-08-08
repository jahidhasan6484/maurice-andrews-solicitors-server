const express = require("express");
const cors = require("cors");
const app = express();

const callbackRequestRoutes = require("./app/modules/callbackRequest/callbackRequest.route");

// Using cors
app.use(cors());

// Parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/callback", callbackRequestRoutes);
// app.use("/api/v1/email", sendEmail);

app.use((req, res) => {
  res.status(404).json({ error: "API route not found." });
});

module.exports = app;
