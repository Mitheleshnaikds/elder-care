const express = require("express");
const router = express.Router();
const { registerElder, registerRelative, login } = require("../controllers/authController");

// Elder routes
router.post("/register/elder", registerElder);
router.post("/register/relative", registerRelative);

// Login
router.post("/login", login);

module.exports = router;
