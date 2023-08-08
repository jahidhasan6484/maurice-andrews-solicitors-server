const { createCallbackRequestToDB } = require("./callbackRequest.service");

const createCallbackRequest = async (req, res) => {
  const data = req.body;
  try {
    const savedCallback = await createCallbackRequestToDB(data);

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

module.exports = {
  createCallbackRequest,
};
