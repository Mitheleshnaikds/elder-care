const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  elder: { type: mongoose.Schema.Types.ObjectId, ref: "Elder", required: true },
  name: { type: String, required: true },
  time: { type: String, required: true }, // HH:MM format
  dosage: { type: String },
  instructions: { type: String },
  isActive: { type: Boolean, default: true },
  takenToday: { type: Boolean, default: false },
  takenAt: { type: Date },
  takenBy: { type: String, enum: ["elder", "relative"], default: "elder" }
}, { timestamps: true });

module.exports = mongoose.model("Medication", medicationSchema);
