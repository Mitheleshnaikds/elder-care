const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { linkRelative } = require("../controllers/elderController");

// Protected route: only elders can link relatives
router.post("/link-relative", authMiddleware(["elder"]), linkRelative);

module.exports = router;
