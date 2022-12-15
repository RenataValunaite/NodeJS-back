const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  tutorialIds: { type: Array },
  totalTutorialsDone: { type: Number },
  regTimeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
