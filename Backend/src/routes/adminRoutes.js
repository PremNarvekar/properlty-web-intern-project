const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");
const { uploadImage, uploadVideo } = require("../middleware/upload.js");

router.post("/upload/image", uploadImage.single("image"), adminController.uploadImage);
router.post("/upload/video", uploadVideo.single("video"), adminController.uploadVideo);
router.put("/user/image/:id", uploadImage.single("image"), adminController.updateUserImage);
router.delete("/media/:id", adminController.deleteMedia);

module.exports = router;
