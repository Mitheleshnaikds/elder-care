const Alert = require("../models/Alert");
const Elder = require("../models/Elder");
const Relative = require("../models/Relative");
const Medication = require("../models/Medication");

// Get alerts for a relative's elders
exports.getAlerts = async (req, res) => {
  try {
    const { id } = req.user; // relative id
    // find elders linked to this relative
    const elders = await Elder.find({ relatives: id }).select("_id");
    const elderIds = elders.map((e) => e._id);
    const alerts = await Alert.find({ elder: { $in: elderIds } })
      .populate("elder", "name phone")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all linked elders with their recent activities
exports.getLinkedElders = async (req, res) => {
  try {
    const relativeId = req.user.id;
    const relative = await Relative.findById(relativeId).populate({
      path: "elders",
      select: "name age phone email"
    });
    
    if (!relative) {
      return res.status(404).json({ msg: "Relative not found" });
    }

    // Get recent alerts for each elder
    const elderIds = relative.elders.map(elder => elder._id);
    const recentAlerts = await Alert.find({ elder: { $in: elderIds } })
      .populate("elder", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      elders: relative.elders,
      recentAlerts
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get elder's health data
exports.getElderHealth = async (req, res) => {
  try {
    const { elderId } = req.params;
    const relativeId = req.user.id;
    
    // Verify the elder is linked to this relative
    const relative = await Relative.findById(relativeId);
    if (!relative.elders.includes(elderId)) {
      return res.status(403).json({ msg: "Not authorized to view this elder's data" });
    }

    // For now, return mock health data - you can implement real health tracking later
    const healthData = {
      bloodPressure: "120/80",
      heartRate: "72 bpm", 
      bloodSugar: "95 mg/dL",
      lastUpdated: new Date(),
      status: "Normal"
    };

    res.json(healthData);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get elder's medication schedule
exports.getElderMedications = async (req, res) => {
  try {
    const { elderId } = req.params;
    const relativeId = req.user.id;
    
    // Verify the elder is linked to this relative
    const relative = await Relative.findById(relativeId);
    if (!relative.elders.includes(elderId)) {
      return res.status(403).json({ msg: "Not authorized to view this elder's data" });
    }

    const medications = await Medication.find({ elder: elderId, isActive: true })
      .sort({ time: 1 });

    res.json(medications);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mark elder's medication as taken (by relative)
exports.markElderMedicationTaken = async (req, res) => {
  try {
    const { elderId, medicationId } = req.params;
    const relativeId = req.user.id;
    
    // Verify the elder is linked to this relative
    const relative = await Relative.findById(relativeId);
    if (!relative.elders.includes(elderId)) {
      return res.status(403).json({ msg: "Not authorized to update this elder's data" });
    }

    const medication = await Medication.findOneAndUpdate(
      { _id: medicationId, elder: elderId },
      { 
        takenToday: true, 
        takenAt: new Date(),
        takenBy: "relative"
      },
      { new: true }
    );
    
    if (!medication) {
      return res.status(404).json({ msg: "Medication not found" });
    }
    
    res.json({ msg: "Medication marked as taken by relative", medication });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add medication for elder (by relative)
exports.addElderMedication = async (req, res) => {
  try {
    const { elderId } = req.params;
    const relativeId = req.user.id;
    const { name, time, dosage, instructions } = req.body;
    
    // Verify the elder is linked to this relative
    const relative = await Relative.findById(relativeId);
    if (!relative.elders.includes(elderId)) {
      return res.status(403).json({ msg: "Not authorized to add medication for this elder" });
    }

    const medication = await Medication.create({
      elder: elderId,
      name,
      time,
      dosage,
      instructions
    });
    
    res.json({ msg: "Medication added for elder", medication });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


