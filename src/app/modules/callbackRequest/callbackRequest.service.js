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

const getTodaysCallbackListFromDB = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayCallbacks = await CallbackRequest.find({
      callback_date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const filteredCallbacks = todayCallbacks.filter((callback) => {
      const callbackDateWithoutTime = new Date(callback.callback_date);
      callbackDateWithoutTime.setHours(0, 0, 0, 0);
      return callbackDateWithoutTime.getTime() === today.getTime();
    });

    return filteredCallbacks;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching today's callback requests."
    );
  }
};

const getUpcomingCallbackListFromDB = async () => {
  try {
    const currentDate = new Date();

    const upcomingCallbacks = await CallbackRequest.find({
      callback_date: { $gt: currentDate },
    }).sort({ callback_date: 1 });

    return upcomingCallbacks;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching upcoming callback requests."
    );
  }
};

module.exports = {
  createCallbackRequestInDB,
  getAllCallbacksFromDB,
  updateCallbackStatusInDB,
  getTodaysCallbackListFromDB,
  getUpcomingCallbackListFromDB,
};
