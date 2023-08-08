const CallbackRequest = require("./callbackRequest.model");

const createCallbackRequestToDB = async (data) => {
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

module.exports = {
  createCallbackRequestToDB,
};
