const express = require("express");
const router = express.Router();
const settingsController = require("../controller/settingsController");
const { uploadImage } = require("../middleware/upload");

router.get("/settings", settingsController.getSettings);
router.put("/settings", uploadImage.single("heroImage"), settingsController.updateSettings);

module.exports = router;
