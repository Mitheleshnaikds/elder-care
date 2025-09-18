const express = require("express");
const router = express.Router();
const { linkRelative, sendSOS, getMedications, addMedication, markMedicationTaken, removeMedication } = require("../controllers/elderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/link-relative", authMiddleware(["elder"]), linkRelative);
router.post("/sos", authMiddleware(["elder"]), sendSOS);
router.get("/medications", authMiddleware(["elder"]), getMedications);
router.post("/medications", authMiddleware(["elder"]), addMedication);
router.put("/medications/:medicationId/taken", authMiddleware(["elder"]), markMedicationTaken);
router.delete("/medications/:medicationId", authMiddleware(["elder"]), removeMedication);

module.exports = router;   // ✅ must export router
