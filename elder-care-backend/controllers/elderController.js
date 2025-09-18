const Elder = require("../models/Elder");
const Relative = require("../models/Relative");
const Alert = require("../models/Alert");
const Medication = require("../models/Medication");
const twilio = require("twilio");

// Link Relative to Elder
exports.linkRelative = async (req, res) => {
  try {
    const { relativeEmail } = req.body;
    const elderId = req.user.id; // from auth middleware

    if (!relativeEmail) {
      return res.status(400).json({ msg: "Relative email is required" });
    }

    const elder = await Elder.findById(elderId);
    if (!elder) {
      return res.status(404).json({ msg: "Elder not found" });
    }

    const relative = await Relative.findOne({ email: relativeEmail });
    if (!relative) {
      return res.status(404).json({ msg: `No relative found with email: ${relativeEmail}. Please make sure the relative is registered first.` });
    }

    // Avoid duplicate linking
    if (!elder.relatives.includes(relative._id)) {
      elder.relatives.push(relative._id);
      await elder.save();
    }

    if (!relative.elders.includes(elderId)) {
      relative.elders.push(elderId);
      await relative.save();
    }

    res.json({ msg: "Relative linked successfully", elder, relative });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SOS: create alert and notify relatives via Twilio (if configured)
exports.sendSOS = async (req, res) => {
  try {
    const { location } = req.body;
    const elderId = req.user.id; // from auth middleware
    const elder = await Elder.findById(elderId).populate("relatives");
    if (!elder) return res.status(404).json({ msg: "Elder not found" });

    const alert = await Alert.create({
      elder: elder._id,
      type: "SOS",
      message: `SOS from ${elder.name}`,
      location,
    });

    if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_FROM) {
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
      const text = `SOS ALERT: ${elder.name}${location ? ` @ (${location.lat}, ${location.lng})` : ""}`;
      const toNumbers = elder.relatives.map((r) => r.phone).filter(Boolean);
      await Promise.allSettled(
        toNumbers.map((to) => client.messages.create({ from: process.env.TWILIO_FROM, to, body: text }))
      );
    }

    res.json({ msg: "SOS sent", alert });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get elder's medications
exports.getMedications = async (req, res) => {
  try {
    const elderId = req.user.id;
    const medications = await Medication.find({ elder: elderId, isActive: true })
      .sort({ time: 1 });
    
    res.json(medications);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add new medication
exports.addMedication = async (req, res) => {
  try {
    const elderId = req.user.id;
    const { name, time, dosage, instructions } = req.body;
    
    const medication = await Medication.create({
      elder: elderId,
      name,
      time,
      dosage,
      instructions
    });
    
    res.json({ msg: "Medication added", medication });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mark medication as taken
exports.markMedicationTaken = async (req, res) => {
  try {
    const elderId = req.user.id;
    const { medicationId } = req.params;
    
    const medication = await Medication.findOneAndUpdate(
      { _id: medicationId, elder: elderId },
      { 
        takenToday: true, 
        takenAt: new Date(),
        takenBy: "elder"
      },
      { new: true }
    );
    
    if (!medication) {
      return res.status(404).json({ msg: "Medication not found" });
    }
    
    res.json({ msg: "Medication marked as taken", medication });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove medication
exports.removeMedication = async (req, res) => {
  try {
    const elderId = req.user.id;
    const { medicationId } = req.params;
    
    const medication = await Medication.findOneAndUpdate(
      { _id: medicationId, elder: elderId },
      { isActive: false },
      { new: true }
    );
    
    if (!medication) {
      return res.status(404).json({ msg: "Medication not found" });
    }
    
    res.json({ msg: "Medication removed", medication });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
