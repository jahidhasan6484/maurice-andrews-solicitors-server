const CallbackRequest = require("./callbackRequest.model");

const createCallbackRequestInDB = async (data) => {
  try {
    const newCallbackRequest = new CallbackRequest(data);
    const savedCallbackRequest = await newCallbackRequest.save();
    return savedCallbackRequest;
  } catch (error) {
    if (error.message.includes("is required")) {
      throw new Error("Please provide all required fields.");
    }
    throw new Error("Failed to send callback request, try again!");
  }
};

const getAllCallbacksFromDB = async () => {
  try {
    const allCallbacks = await CallbackRequest.find().sort({ _id: -1 }); // reverse using _id : -1
    return allCallbacks;
  } catch (error) {
    throw new Error("An error occurred while fetching callback data.");
  }
};

const updateCallbackStatusInDB = async (callbackId) => {
  try {
    const updatedCallback = await CallbackRequest.findByIdAndUpdate(
      callbackId,
      { callback: true },
      { new: true }
    );

    if (!updatedCallback) {
      throw new Error("Callback not found.");
    }

    return updatedCallback;
  } catch (error) {
    throw new Error("An error occurred while updating the callback status.");
  }
};

module.exports = {
  createCallbackRequestInDB,
  getAllCallbacksFromDB,
  updateCallbackStatusInDB,
};
