const express = require("express");
const router = express.Router();
const { registerElder, registerRelative, login } = require("../controllers/authController");

router.post("/register/elder", registerElder);
router.post("/register/relative", registerRelative);
router.post("/login", login);

module.exports = router;   // ✅ must export router
