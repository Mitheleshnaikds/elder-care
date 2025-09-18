const mongoose = require("mongoose");

const elderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  relatives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Relative" }],
});

module.exports = mongoose.model("Elder", elderSchema);
