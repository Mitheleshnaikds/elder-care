const express = require("express");
const router = express.Router();
const { getAlerts, getLinkedElders, getElderHealth, getElderMedications, markElderMedicationTaken, addElderMedication } = require("../controllers/relativeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/alerts", authMiddleware(["relative", "admin"]), getAlerts);
router.get("/elders", authMiddleware(["relative", "admin"]), getLinkedElders);
router.get("/elder/:elderId/health", authMiddleware(["relative", "admin"]), getElderHealth);
router.get("/elder/:elderId/medications", authMiddleware(["relative", "admin"]), getElderMedications);
router.put("/elder/:elderId/medications/:medicationId/taken", authMiddleware(["relative", "admin"]), markElderMedicationTaken);
router.post("/elder/:elderId/medications", authMiddleware(["relative", "admin"]), addElderMedication);

module.exports = router;   // ✅ must export router
