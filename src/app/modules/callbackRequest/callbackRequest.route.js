const express = require("express");
const {
  createCallbackRequest,
  getAllCallbacks,
  updateStatus,
} = require("./callbackRequest.controller");

const router = express.Router();

router.post("/request", createCallbackRequest);
router.get("/", getAllCallbacks);
router.patch("/update/:callbackId", updateStatus);

module.exports = router;
