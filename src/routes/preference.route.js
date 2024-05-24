const express = require("express");
const router = express.Router();
const preferenceController = require("../controller/preference.controller.js");

router.post("/addAllPreferences", preferenceController.populateAllPreferences);
router.post("/updateUserPreference", preferenceController.updateUserPreference)

module.exports = router;
