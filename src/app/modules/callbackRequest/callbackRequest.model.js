const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
  },
  callback_date: {
    type: Date,
    required: true,
  },
  preferred_time: {
    type: String,
    trim: true,
  },
});

callbackSchema.pre("save", function (next) {
  if (!this.full_name || !this.telephone || !this.callback_date) {
    throw new Error("Please provide all required fields.");
  }
  next();
});

const CallbackRequest = mongoose.model("CallbackRequest", callbackSchema);

module.exports = CallbackRequest;
