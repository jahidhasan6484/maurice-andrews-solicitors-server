const express = require("express");
const {
  createCallbackRequest,
  getAllCallbacks,
  updateStatus,
  getTodaysCallbackList,
  getUpcomingCallbacksList,
} = require("./callbackRequest.controller");

const router = express.Router();

router.post("/request", createCallbackRequest); // User
router.get("/", getAllCallbacks); // Admin
router.patch("/update/:callbackId", updateStatus); // Admin
router.get("/today", getTodaysCallbackList); // Admin
router.get("/upcoming", getUpcomingCallbacksList); // Admin

module.exports = router;
