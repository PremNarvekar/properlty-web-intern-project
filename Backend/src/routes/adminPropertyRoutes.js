const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middleware/upload.js");
const adminController = require("../controller/adminPropertyController.js");

router.post(
    "/property",
    uploadImage.array("images", 5),
    adminController.addProperty
);

router.put("/property/:id", adminController.updateProperty);
router.delete("/property/:id", adminController.deleteProperty);
router.get("/properties", adminController.getAllProperties);

module.exports = router;
