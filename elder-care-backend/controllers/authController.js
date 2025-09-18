const Elder = require("../models/Elder");
const Relative = require("../models/Relative");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register Elder
exports.registerElder = async (req, res) => {
  try {
    const { name, age, phone, email, password } = req.body;

    // check if elder exists
    const existing = await Elder.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Elder already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const elder = await Elder.create({ name, age, phone, email, password: hashed });

    res.json({
      token: generateToken(elder._id, "elder"),
      elder,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Register Relative
exports.registerRelative = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existing = await Relative.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Relative already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const relative = await Relative.create({ name, phone, email, password: hashed });

    res.json({
      token: generateToken(relative._id, "relative"),
      relative,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login (works for both elder + relative)
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === "elder") user = await Elder.findOne({ email });
    else if (role === "relative") user = await Relative.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, role),
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
