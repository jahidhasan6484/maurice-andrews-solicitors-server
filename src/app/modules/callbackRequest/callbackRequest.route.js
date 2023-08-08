const express = require("express");
const { createCallbackRequest } = require("./callbackRequest.controller");

const router = express.Router();

router.post("/request", createCallbackRequest);

module.exports = router;
