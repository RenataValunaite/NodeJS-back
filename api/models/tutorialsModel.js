const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
  userId: { type: String, required: true, min: 10 },
  title: { type: String, required: true, min: 3 },
  tutorialIds: { type: Array },
  content: { type: Array },
  private: { type: Boolean },
});

module.exports = mongoose.model("Tutorials", tutorialSchema);
