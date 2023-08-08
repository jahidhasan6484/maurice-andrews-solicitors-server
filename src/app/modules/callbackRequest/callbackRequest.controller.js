const PhoneNumber = require("libphonenumber-js");
const {
  createCallbackRequestInDB,
  getAllCallbacksFromDB,
  updateCallbackStatusInDB,
} = require("./callbackRequest.service");
const mongoose = require("mongoose");

const createCallbackRequest = async (req, res) => {
  const data = req.body;

  // Regular expression pattern for US phone number format
  const usPhoneNumberPattern =
    /^(\d{10}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4}|\(\d{3}\) \d{3}-\d{4})$/;

  if (data.telephone) {
    if (!usPhoneNumberPattern.test(data.telephone)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const phoneNumber = PhoneNumber(data.telephone, "US");
    if (!phoneNumber.isValid()) {
      return res.status(400).json({ error: "Invalid phone number." });
    }
  }

  try {
    const savedCallback = await createCallbackRequestInDB(data);

    res.status(201).json({
      message: "Successfully requested a callback.",
      data: savedCallback,
    });
  } catch (error) {
    if (error.message.includes("is required")) {
      res.status(400).json({ error: "Please provide all required fields." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getAllCallbacks = async (req, res) => {
  try {
    const allCallbacks = await getAllCallbacksFromDB();

    res.status(200).json({
      data: allCallbacks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching callback data." });
  }
};

const updateStatus = async (req, res) => {
  const { callbackId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(callbackId)) {
    return res.status(400).json({ error: "Invalid callback ID format." });
  }
  try {
    const updatedCallback = await updateCallbackStatusInDB(callbackId);

    res.status(200).json({
      message: "Callback status updated successfully.",
      data: updatedCallback,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the callback status." });
  }
};

module.exports = {
  createCallbackRequest,
  getAllCallbacks,
  updateStatus,
};
