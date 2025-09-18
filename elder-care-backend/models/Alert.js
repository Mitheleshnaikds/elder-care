const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    elder: { type: mongoose.Schema.Types.ObjectId, ref: "Elder", required: true },
    type: { type: String, enum: ["SOS", "Medication", "GeoFence"], default: "SOS" },
    message: { type: String, required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);



