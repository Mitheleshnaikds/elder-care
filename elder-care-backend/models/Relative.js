const mongoose = require("mongoose");

const relativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  elders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Elder" }]
});

module.exports = mongoose.model("Relative", relativeSchema);
