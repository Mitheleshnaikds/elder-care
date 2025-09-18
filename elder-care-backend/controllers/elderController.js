const Elder = require("../models/Elder");
const Relative = require("../models/Relative");

// Link Relative to Elder
exports.linkRelative = async (req, res) => {
  try {
    const { elderId, relativeId } = req.body;

    const elder = await Elder.findById(elderId);
    const relative = await Relative.findById(relativeId);

    if (!elder || !relative) {
      return res.status(404).json({ msg: "Elder or Relative not found" });
    }

    // Avoid duplicate linking
    if (!elder.relatives.includes(relativeId)) {
      elder.relatives.push(relativeId);
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
